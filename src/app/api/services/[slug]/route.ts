import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/services/[slug] - Get service by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    const { slug } = await params;
    
    const service = await db.service.findUnique({
      where: { slug },
    });
    
    if (!service) {
      return apiError('Service not found', 404);
    }
    
    // Non-admins can only see active services
    if (user?.role !== 'admin' && !service.isActive) {
      return apiError('Service not found', 404);
    }
    
    return apiResponse({ service });
  } catch (error) {
    console.error('Get service error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// PUT /api/services/[slug] - Update service (admin only)
const updateServiceSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  shortDescription: z.string().max(200).optional(),
  icon: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  pricing: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const service = await db.service.findUnique({
      where: { slug },
    });
    
    if (!service) {
      return apiError('Service not found', 404);
    }
    
    const body = await request.json();
    const result = updateServiceSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    const updateData: Record<string, unknown> = {};
    
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.icon !== undefined) updateData.icon = data.icon;
    if (data.image !== undefined) updateData.image = data.image || null;
    if (data.features) updateData.features = JSON.stringify(data.features);
    if (data.pricing) updateData.pricing = JSON.stringify(data.pricing);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.order !== undefined) updateData.order = data.order;
    
    const updatedService = await db.service.update({
      where: { id: service.id },
      data: updateData,
    });
    
    return apiResponse({
      success: true,
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    console.error('Update service error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/services/[slug] - Delete service (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const service = await db.service.findUnique({
      where: { slug },
    });
    
    if (!service) {
      return apiError('Service not found', 404);
    }
    
    await db.service.delete({
      where: { id: service.id },
    });
    
    return apiResponse({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    return apiError('Internal server error', 500);
  }
}
