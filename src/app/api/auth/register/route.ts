import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, setSessionCookie, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const { name, email, password, phone } = result.data;
    
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (existingUser) {
      return apiError('User with this email already exists', 409);
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        role: 'customer',
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
    
    // Set session cookie
    await setSessionCookie(user.id, user.role);
    
    return apiResponse({
      success: true,
      message: 'Registration successful',
      user,
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return apiError('Internal server error', 500);
  }
}
