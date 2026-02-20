import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating a testimonial
const createTestimonialSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerTitle: z.string().optional(),
  avatar: z.string().url().optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  isApproved: z.boolean().optional(),
});

// GET /api/testimonials - List testimonials
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Non-admins only see approved testimonials
    if (user?.role !== 'admin') {
      where.isApproved = true;
    }
    
    // Get testimonials with pagination
    const [testimonials, total] = await Promise.all([
      db.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.testimonial.count({ where }),
    ]);
    
    return apiResponse({
      testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// POST /api/testimonials - Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const body = await request.json();
    const result = createTestimonialSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Create testimonial
    const testimonial = await db.testimonial.create({
      data: {
        customerName: data.customerName,
        customerTitle: data.customerTitle,
        avatar: data.avatar || null,
        rating: data.rating,
        content: data.content,
        isApproved: data.isApproved ?? false,
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Testimonial created successfully',
      testimonial,
    }, 201);
  } catch (error) {
    console.error('Create testimonial error:', error);
    return apiError('Internal server error', 500);
  }
}

// PUT /api/testimonials - Update testimonial (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) {
      return apiError('Testimonial ID is required', 400);
    }
    
    const testimonial = await db.testimonial.findUnique({
      where: { id },
    });
    
    if (!testimonial) {
      return apiError('Testimonial not found', 404);
    }
    
    const updateData: Record<string, unknown> = {};
    
    if (data.customerName) updateData.customerName = data.customerName;
    if (data.customerTitle !== undefined) updateData.customerTitle = data.customerTitle;
    if (data.avatar !== undefined) updateData.avatar = data.avatar || null;
    if (data.rating) updateData.rating = data.rating;
    if (data.content) updateData.content = data.content;
    if (data.isApproved !== undefined) updateData.isApproved = data.isApproved;
    
    const updatedTestimonial = await db.testimonial.update({
      where: { id },
      data: updateData,
    });
    
    return apiResponse({
      success: true,
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/testimonials - Delete testimonial (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return apiError('Testimonial ID is required', 400);
    }
    
    const testimonial = await db.testimonial.findUnique({
      where: { id },
    });
    
    if (!testimonial) {
      return apiError('Testimonial not found', 404);
    }
    
    await db.testimonial.delete({
      where: { id },
    });
    
    return apiResponse({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return apiError('Internal server error', 500);
  }
}
