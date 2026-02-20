import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating an inquiry
const createInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  source: z.enum(['website', 'whatsapp', 'email', 'phone']).optional(),
});

// GET /api/inquiries - List inquiries (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    if (status) {
      where.status = status;
    }
    
    if (priority) {
      where.priority = priority;
    }
    
    // Get inquiries with pagination
    const [inquiries, total] = await Promise.all([
      db.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      db.inquiry.count({ where }),
    ]);
    
    return apiResponse({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return apiError('Internal server error', 500);
  }
}

// POST /api/inquiries - Create a new inquiry (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createInquirySchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Create inquiry
    const inquiry = await db.inquiry.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        source: data.source || 'website',
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you soon!',
      inquiry,
    }, 201);
  } catch (error) {
    console.error('Create inquiry error:', error);
    return apiError('Internal server error', 500);
  }
}
