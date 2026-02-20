import { NextRequest } from 'next/server';
import { getCurrentUser, apiResponse, apiError, clearSession, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

// Get current user
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    return apiResponse({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return apiError('Internal server error', 500);
  }
}

// Update profile
const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional().or(z.literal('')),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const body = await request.json();
    const result = updateProfileSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const { name, phone, avatar, currentPassword, newPassword } = result.data;
    
    // If updating password, verify current password
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return apiError('Both current and new password are required', 400);
      }
      
      const userWithPassword = await db.user.findUnique({
        where: { id: user.id },
        select: { password: true },
      });
      
      const { comparePassword } = await import('@/lib/auth');
      const isValid = await comparePassword(currentPassword, userWithPassword?.password || '');
      
      if (!isValid) {
        return apiError('Current password is incorrect', 400);
      }
    }
    
    // Update user
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
        ...(newPassword && { password: await hashPassword(newPassword) }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return apiError('Internal server error', 500);
  }
}

// Delete account
export async function DELETE() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    // Delete user (cascade will delete related data)
    await db.user.delete({
      where: { id: user.id },
    });
    
    await clearSession();
    
    return apiResponse({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Delete account error:', error);
    return apiError('Internal server error', 500);
  }
}
