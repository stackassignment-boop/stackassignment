import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, requireAdmin, generateOrderNumber, calculatePrice, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating an order
const createOrderSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  subject: z.string().min(2, 'Subject is required'),
  academicLevel: z.enum(['high_school', 'bachelor', 'master', 'phd']),
  paperType: z.enum(['essay', 'research_paper', 'dissertation', 'thesis', 'coursework', 'other']),
  pages: z.number().int().min(1, 'At least 1 page is required'),
  words: z.number().int().optional(),
  deadline: z.string().transform(val => new Date(val)),
  requirements: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

// GET /api/orders - List orders (admin sees all, customer sees their own)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Customers only see their own orders
    if (user.role !== 'admin') {
      where.customerId = user.id;
    }
    
    if (status) {
      where.status = status;
    }
    
    // Get orders with pagination
    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      db.order.count({ where }),
    ]);
    
    return apiResponse({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return apiError('Internal server error', 500);
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const body = await request.json();
    const result = createOrderSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    // Calculate days until deadline
    const now = new Date();
    const deadline = new Date(data.deadline);
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) {
      return apiError('Deadline cannot be in the past', 400);
    }
    
    // Calculate price
    const pricing = calculatePrice({
      academicLevel: data.academicLevel as 'high_school' | 'bachelor' | 'master' | 'phd',
      deadline: daysUntilDeadline,
      pages: data.pages,
    });
    
    // Create order
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        title: data.title,
        description: data.description,
        subject: data.subject,
        academicLevel: data.academicLevel,
        paperType: data.paperType,
        pages: data.pages,
        words: data.words,
        pricePerPage: pricing.pricePerPage,
        urgencyMultiplier: pricing.urgencyMultiplier,
        totalPrice: pricing.totalPrice,
        deadline: data.deadline,
        requirements: data.requirements,
        attachments: data.attachments ? JSON.stringify(data.attachments) : null,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Order created successfully',
      order,
    }, 201);
  } catch (error) {
    console.error('Create order error:', error);
    return apiError('Internal server error', 500);
  }
}
