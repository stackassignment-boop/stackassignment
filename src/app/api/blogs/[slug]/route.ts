import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/blogs/[slug] - Get blog post by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    if (!blog) {
      return apiError('Blog post not found', 404);
    }
    
    // Non-admins can only see published posts
    if (user?.role !== 'admin' && !blog.isPublished) {
      return apiError('Blog post not found', 404);
    }
    
    // Increment view count
    await db.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    });
    
    return apiResponse({ blog });
  } catch (error) {
    console.error('Get blog error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// PUT /api/blogs/[slug] - Update blog post (admin only)
const updateBlogSchema = z.object({
  title: z.string().min(5).optional(),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(50).optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) {
      return apiError('Blog post not found', 404);
    }
    
    const body = await request.json();
    const result = updateBlogSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    const updateData: Record<string, unknown> = {};
    
    if (data.title) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content) updateData.content = data.content;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage || null;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.tags) updateData.tags = JSON.stringify(data.tags);
    
    // Handle publish status
    if (data.isPublished !== undefined) {
      updateData.isPublished = data.isPublished;
      if (data.isPublished && !blog.isPublished) {
        updateData.publishedAt = new Date();
      }
    }
    
    const updatedBlog = await db.blog.update({
      where: { id: blog.id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Blog post updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/blogs/[slug] - Delete blog post (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) {
      return apiError('Blog post not found', 404);
    }
    
    await db.blog.delete({
      where: { id: blog.id },
    });
    
    return apiResponse({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return apiError('Internal server error', 500);
  }
}
