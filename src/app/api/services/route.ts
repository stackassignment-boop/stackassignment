import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, generateSlug, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating a service
const createServiceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().max(200).optional(),
  icon: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  pricing: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// GET /api/services - List services
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Non-admins only see active services
    if (user?.role !== 'admin' || isActive === 'true') {
      where.isActive = true;
    }
    
    const services = await db.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    
    return apiResponse({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// POST /api/services - Create a new service (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const body = await request.json();
    const result = createServiceSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Generate slug
    let slug = generateSlug(data.title);
    let counter = 1;
    
    // Ensure unique slug
    while (await db.service.findUnique({ where: { slug } })) {
      slug = `${generateSlug(data.title)}-${counter}`;
      counter++;
    }
    
    // Create service
    const service = await db.service.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        shortDescription: data.shortDescription,
        icon: data.icon,
        image: data.image || null,
        features: data.features ? JSON.stringify(data.features) : null,
        pricing: data.pricing ? JSON.stringify(data.pricing) : null,
        isActive: data.isActive ?? true,
        order: data.order || 0,
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Service created successfully',
      service,
    }, 201);
  } catch (error) {
    console.error('Create service error:', error);
    return apiError('Internal server error', 500);
  }
}
