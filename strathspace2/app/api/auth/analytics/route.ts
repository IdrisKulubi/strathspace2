import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { getAuthAnalytics, getRealTimeAuthMetrics } from '@/app/lib/auth/monitoring';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin role (you may need to adjust this based on your role system)
    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'analytics';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (type === 'realtime') {
      const realTimeMetrics = await getRealTimeAuthMetrics();
      return NextResponse.json(realTimeMetrics);
    }

    // Default to last 30 days if no dates provided
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const analytics = await getAuthAnalytics(start, end);
    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Auth analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}