import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, requireAdmin, generateSlug, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating a blog post
const createBlogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

// GET /api/blogs - List blog posts
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Non-admins only see published posts
    if (user?.role !== 'admin') {
      where.isPublished = true;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (tag) {
      where.tags = { contains: tag };
    }
    
    // Get blogs with pagination
    const [blogs, total] = await Promise.all([
      db.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
      db.blog.count({ where }),
    ]);
    
    return apiResponse({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    return apiError('Internal server error', 500);
  }
}

// POST /api/blogs - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const body = await request.json();
    const result = createBlogSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Generate slug
    let slug = generateSlug(data.title);
    let counter = 1;
    
    // Ensure unique slug
    while (await db.blog.findUnique({ where: { slug } })) {
      slug = `${generateSlug(data.title)}-${counter}`;
      counter++;
    }
    
    // Create blog
    const blog = await db.blog.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        authorId: authResult.user!.id,
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
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
      message: 'Blog post created successfully',
      blog,
    }, 201);
  } catch (error) {
    console.error('Create blog error:', error);
    return apiError('Internal server error', 500);
  }
}
