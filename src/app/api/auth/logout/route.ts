import { clearSession, apiResponse } from '@/lib/auth';

export async function POST() {
  try {
    await clearSession();
    
    return apiResponse({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return apiResponse({
      success: true,
      message: 'Logout successful',
    });
  }
}
