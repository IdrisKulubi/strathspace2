/**
 * Session tracking utilities for authentication monitoring
 */

import { NextRequest } from 'next/server';
import { auth } from '@/app/lib/auth';
import { trackAuthSession, recordAuthMetric } from './monitoring';

/**
 * Tracks session activity in middleware
 */
export async function trackSessionActivity(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session?.user) {
      // Track session refresh if it's been a while since last activity
      const lastActivity = request.cookies.get('last_activity')?.value;
      const now = Date.now();
      
      if (!lastActivity || now - parseInt(lastActivity) > 5 * 60 * 1000) { // 5 minutes
        await trackAuthSession(
          session.session.id,
          session.user.id,
          'refreshed',
          {
            userAgent: request.headers.get('user-agent') || undefined,
            ipAddress: request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || undefined,
            path: request.nextUrl.pathname,
          }
        );

        // Update last activity timestamp
        const response = new Response();
        response.cookies.set('last_activity', now.toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
    }
  } catch (error) {
    console.error('Session tracking error:', error);
  }
}

/**
 * Tracks logout events
 */
export async function trackLogout(userId: string, sessionId: string, request: NextRequest) {
  try {
    await Promise.all([
      trackAuthSession(sessionId, userId, 'revoked', {
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || undefined,
        reason: 'user_logout',
      }),
      recordAuthMetric({
        event: 'logout',
        userId,
        success: true,
        timestamp: new Date(),
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || undefined,
      }),
    ]);
  } catch (error) {
    console.error('Logout tracking error:', error);
  }
}

/**
 * Tracks session expiration
 */
export async function trackSessionExpiration(userId: string, sessionId: string) {
  try {
    await trackAuthSession(sessionId, userId, 'expired', {
      reason: 'session_timeout',
    });
  } catch (error) {
    console.error('Session expiration tracking error:', error);
  }
}