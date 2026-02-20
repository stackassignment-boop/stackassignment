import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/inquiries/[id] - Get inquiry details (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { id } = await params;
    
    const inquiry = await db.inquiry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    if (!inquiry) {
      return apiError('Inquiry not found', 404);
    }
    
    return apiResponse({ inquiry });
  } catch (error) {
    console.error('Get inquiry error:', error);
    return apiError('Internal server error', 500);
  }
}

// PUT /api/inquiries/[id] - Update inquiry (admin only)
const updateInquirySchema = z.object({
  status: z.enum(['new', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  notes: z.string().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { id } = await params;
    
    const inquiry = await db.inquiry.findUnique({
      where: { id },
    });
    
    if (!inquiry) {
      return apiError('Inquiry not found', 404);
    }
    
    const body = await request.json();
    const result = updateInquirySchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    const updateData: Record<string, unknown> = {};
    
    if (data.status) updateData.status = data.status;
    if (data.priority) updateData.priority = data.priority;
    if (data.notes !== undefined) updateData.notes = data.notes;
    
    // Mark as responded if status changes
    if (data.status && data.status !== 'new' && !inquiry.respondedAt) {
      updateData.respondedAt = new Date();
    }
    
    const updatedInquiry = await db.inquiry.update({
      where: { id },
      data: updateData,
    });
    
    return apiResponse({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry: updatedInquiry,
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/inquiries/[id] - Delete inquiry (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { id } = await params;
    
    const inquiry = await db.inquiry.findUnique({
      where: { id },
    });
    
    if (!inquiry) {
      return apiError('Inquiry not found', 404);
    }
    
    await db.inquiry.delete({
      where: { id },
    });
    
    return apiResponse({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return apiError('Internal server error', 500);
  }
}
