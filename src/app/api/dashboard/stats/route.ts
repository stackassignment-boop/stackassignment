import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';

// GET /api/dashboard/stats - Get dashboard statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    // Get counts
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      totalCustomers,
      newInquiries,
      totalBlogs,
      totalSamples,
    ] = await Promise.all([
      // Total orders
      db.order.count(),
      // Pending orders
      db.order.count({
        where: { status: { in: ['pending', 'confirmed', 'in_progress'] } },
      }),
      // Completed orders
      db.order.count({
        where: { status: 'completed' },
      }),
      // Total revenue (sum of completed orders)
      db.order.aggregate({
        where: { paymentStatus: 'paid' },
        _sum: { totalPrice: true },
      }),
      // Total customers
      db.user.count({
        where: { role: 'customer' },
      }),
      // New inquiries
      db.inquiry.count({
        where: { status: 'new' },
      }),
      // Total blogs
      db.blog.count({
        where: { isPublished: true },
      }),
      // Total samples
      db.sample.count({
        where: { isPublished: true },
      }),
    ]);
    
    // Get recent orders
    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        title: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    
    // Get recent inquiries
    const recentInquiries = await db.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
    
    // Get monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyOrders = await db.order.findMany({
      where: {
        paymentStatus: 'paid',
        createdAt: { gte: sixMonthsAgo },
      },
      select: {
        totalPrice: true,
        createdAt: true,
      },
    });
    
    // Group by month
    const monthlyRevenue: Record<string, number> = {};
    monthlyOrders.forEach(order => {
      const monthKey = order.createdAt.toISOString().slice(0, 7); // YYYY-MM
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + order.totalPrice;
    });
    
    // Get order status distribution
    const orderStatusDistribution = await db.order.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    
    return apiResponse({
      overview: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: totalRevenue._sum.totalPrice || 0,
        totalCustomers,
        newInquiries,
        totalBlogs,
        totalSamples,
      },
      recentOrders,
      recentInquiries,
      monthlyRevenue,
      orderStatusDistribution: orderStatusDistribution.map(item => ({
        status: item.status,
        count: item._count.status,
      })),
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return apiError('Internal server error', 500);
  }
}
