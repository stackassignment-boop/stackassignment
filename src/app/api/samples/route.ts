import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, generateSlug, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating a sample
const createSampleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  subject: z.string().optional(),
  academicLevel: z.string().optional(),
  paperType: z.string().optional(),
  pages: z.number().int().optional(),
  content: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

// GET /api/samples - List samples
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const academicLevel = searchParams.get('academicLevel');
    const paperType = searchParams.get('paperType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Non-admins only see published samples
    if (user?.role !== 'admin') {
      where.isPublished = true;
    }
    
    if (subject) {
      where.subject = subject;
    }
    
    if (academicLevel) {
      where.academicLevel = academicLevel;
    }
    
    if (paperType) {
      where.paperType = paperType;
    }
    
    // Get samples with pagination
    const [samples, total] = await Promise.all([
      db.sample.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.sample.count({ where }),
    ]);
    
    return apiResponse({
      samples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get samples error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// POST /api/samples - Create a new sample (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const body = await request.json();
    const result = createSampleSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Generate slug
    let slug = generateSlug(data.title);
    let counter = 1;
    
    // Ensure unique slug
    while (await db.sample.findUnique({ where: { slug } })) {
      slug = `${generateSlug(data.title)}-${counter}`;
      counter++;
    }
    
    // Create sample
    const sample = await db.sample.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        subject: data.subject,
        academicLevel: data.academicLevel,
        paperType: data.paperType,
        pages: data.pages,
        content: data.content,
        fileUrl: data.fileUrl || null,
        isPublished: data.isPublished ?? true,
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Sample created successfully',
      sample,
    }, 201);
  } catch (error) {
    console.error('Create sample error:', error);
    return apiError('Internal server error', 500);
  }
}
