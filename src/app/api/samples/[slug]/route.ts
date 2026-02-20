import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/samples/[slug] - Get sample by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    const { slug } = await params;
    
    const sample = await db.sample.findUnique({
      where: { slug },
    });
    
    if (!sample) {
      return apiError('Sample not found', 404);
    }
    
    // Non-admins can only see published samples
    if (user?.role !== 'admin' && !sample.isPublished) {
      return apiError('Sample not found', 404);
    }
    
    // Increment view count
    await db.sample.update({
      where: { id: sample.id },
      data: { viewCount: { increment: 1 } },
    });
    
    return apiResponse({ sample });
  } catch (error) {
    console.error('Get sample error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// PUT /api/samples/[slug] - Update sample (admin only)
const updateSampleSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().optional(),
  subject: z.string().optional(),
  academicLevel: z.string().optional(),
  paperType: z.string().optional(),
  pages: z.number().int().optional(),
  content: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const sample = await db.sample.findUnique({
      where: { slug },
    });
    
    if (!sample) {
      return apiError('Sample not found', 404);
    }
    
    const body = await request.json();
    const result = updateSampleSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    const updateData: Record<string, unknown> = {};
    
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.subject !== undefined) updateData.subject = data.subject;
    if (data.academicLevel !== undefined) updateData.academicLevel = data.academicLevel;
    if (data.paperType !== undefined) updateData.paperType = data.paperType;
    if (data.pages !== undefined) updateData.pages = data.pages;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.fileUrl !== undefined) updateData.fileUrl = data.fileUrl || null;
    if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;
    
    const updatedSample = await db.sample.update({
      where: { id: sample.id },
      data: updateData,
    });
    
    return apiResponse({
      success: true,
      message: 'Sample updated successfully',
      sample: updatedSample,
    });
  } catch (error) {
    console.error('Update sample error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/samples/[slug] - Delete sample (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const sample = await db.sample.findUnique({
      where: { slug },
    });
    
    if (!sample) {
      return apiError('Sample not found', 404);
    }
    
    await db.sample.delete({
      where: { id: sample.id },
    });
    
    return apiResponse({
      success: true,
      message: 'Sample deleted successfully',
    });
  } catch (error) {
    console.error('Delete sample error:', error);
    return apiError('Internal server error', 500);
  }
}
