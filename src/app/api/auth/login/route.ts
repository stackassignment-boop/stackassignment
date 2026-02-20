import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, setSessionCookie, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const { email, password } = result.data;
    
    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      return apiError('Invalid email or password', 401);
    }
    
    // Check if user is active
    if (!user.isActive) {
      return apiError('Account has been deactivated', 403);
    }
    
    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return apiError('Invalid email or password', 401);
    }
    
    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    // Set session cookie
    await setSessionCookie(user.id, user.role);
    
    return apiResponse({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return apiError('Internal server error', 500);
  }
}
