/**
 * Authentication Monitoring System
 * Tracks authentication metrics, performance, and analytics
 */

import  db  from "@/app/db/drizzle";
import { authMetrics, authSessions, authErrors } from "@/app/db/schema";
import { eq, and, gte, lte, desc, count, avg, sql } from "drizzle-orm";

export interface AuthMetric {
  event: 'login' | 'logout' | 'signup' | 'error' | 'session_refresh';
  userId?: string;
  email?: string;
  provider?: string;
  duration?: number;
  success: boolean;
  errorType?: string;
  errorMessage?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AuthPerformanceMetric {
  operation: string;
  duration: number;
  success: boolean;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AuthAnalytics {
  totalLogins: number;
  totalSignups: number;
  totalErrors: number;
  averageLoginDuration: number;
  successRate: number;
  topErrorTypes: Array<{ type: string; count: number }>;
  loginsByProvider: Array<{ provider: string; count: number }>;
  dailyStats: Array<{
    date: string;
    logins: number;
    signups: number;
    errors: number;
  }>;
}

/**
 * Records an authentication metric
 */
export async function recordAuthMetric(metric: AuthMetric): Promise<void> {
  try {
    await db.insert(authMetrics).values({
      event: metric.event,
      userId: metric.userId,
      email: metric.email,
      provider: metric.provider,
      duration: metric.duration,
      success: metric.success,
      errorType: metric.errorType,
      errorMessage: metric.errorMessage,
      userAgent: metric.userAgent,
      ipAddress: metric.ipAddress,
      timestamp: metric.timestamp,
      metadata: metric.metadata ? JSON.stringify(metric.metadata) : null,
    });
  } catch (error) {
    console.error('Failed to record auth metric:', error);
  }
}

/**
 * Records authentication performance metrics
 */
export async function recordAuthPerformance(
  operation: string,
  startTime: number,
  success: boolean,
  metadata?: Record<string, any>
): Promise<void> {
  const duration = Date.now() - startTime;
  
  try {
    await recordAuthMetric({
      event: 'login', // Will be updated based on operation
      duration,
      success,
      timestamp: new Date(),
      metadata: {
        operation,
        ...metadata,
      },
    });
  } catch (error) {
    console.error('Failed to record auth performance:', error);
  }
}

/**
 * Tracks authentication session lifecycle
 */
export async function trackAuthSession(
  sessionId: string,
  userId: string,
  action: 'created' | 'refreshed' | 'expired' | 'revoked',
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await db.insert(authSessions).values({
      sessionId,
      userId,
      action,
      timestamp: new Date(),
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch (error) {
    console.error('Failed to track auth session:', error);
  }
}

/**
 * Records authentication errors with detailed context
 */
export async function recordAuthError(
  error: Error,
  context: {
    userId?: string;
    email?: string;
    operation?: string;
    userAgent?: string;
    ipAddress?: string;
    metadata?: Record<string, any>;
  }
): Promise<void> {
  try {
    await db.insert(authErrors).values({
      errorType: error.name || 'UnknownError',
      errorMessage: error.message,
      stackTrace: error.stack,
      userId: context.userId,
      email: context.email,
      operation: context.operation,
      userAgent: context.userAgent,
      ipAddress: context.ipAddress,
      timestamp: new Date(),
      metadata: context.metadata ? JSON.stringify(context.metadata) : null,
    });

    // Also record as a metric
    await recordAuthMetric({
      event: 'error',
      userId: context.userId,
      email: context.email,
      success: false,
      errorType: error.name,
      errorMessage: error.message,
      userAgent: context.userAgent,
      ipAddress: context.ipAddress,
      timestamp: new Date(),
      metadata: context.metadata,
    });
  } catch (recordError) {
    console.error('Failed to record auth error:', recordError);
  }
}

/**
 * Gets authentication analytics for a date range
 */
export async function getAuthAnalytics(
  startDate: Date,
  endDate: Date
): Promise<AuthAnalytics> {
  try {
    const dateFilter = and(
      gte(authMetrics.timestamp, startDate),
      lte(authMetrics.timestamp, endDate)
    );

    // Total counts
    const [totalStats] = await db
      .select({
        totalLogins: count(sql`CASE WHEN event = 'login' AND success = true THEN 1 END`),
        totalSignups: count(sql`CASE WHEN event = 'signup' AND success = true THEN 1 END`),
        totalErrors: count(sql`CASE WHEN success = false THEN 1 END`),
        averageLoginDuration: avg(sql`CASE WHEN event = 'login' AND duration IS NOT NULL THEN duration END`),
      })
      .from(authMetrics)
      .where(dateFilter);

    // Success rate
    const [successRateData] = await db
      .select({
        total: count(),
        successful: count(sql`CASE WHEN success = true THEN 1 END`),
      })
      .from(authMetrics)
      .where(dateFilter);

    const successRate = successRateData.total > 0 
      ? (successRateData.successful / successRateData.total) * 100 
      : 0;

    // Top error types
    const topErrorTypes = await db
      .select({
        type: authMetrics.errorType,
        count: count(),
      })
      .from(authMetrics)
      .where(and(dateFilter, eq(authMetrics.success, false)))
      .groupBy(authMetrics.errorType)
      .orderBy(desc(count()))
      .limit(10);

    // Logins by provider
    const loginsByProvider = await db
      .select({
        provider: authMetrics.provider,
        count: count(),
      })
      .from(authMetrics)
      .where(and(dateFilter, eq(authMetrics.event, 'login'), eq(authMetrics.success, true)))
      .groupBy(authMetrics.provider)
      .orderBy(desc(count()));

    // Daily stats
    const dailyStats = await db
      .select({
        date: sql<string>`DATE(timestamp)`,
        logins: count(sql`CASE WHEN event = 'login' AND success = true THEN 1 END`),
        signups: count(sql`CASE WHEN event = 'signup' AND success = true THEN 1 END`),
        errors: count(sql`CASE WHEN success = false THEN 1 END`),
      })
      .from(authMetrics)
      .where(dateFilter)
      .groupBy(sql`DATE(timestamp)`)
      .orderBy(sql`DATE(timestamp)`);

    return {
      totalLogins: totalStats.totalLogins || 0,
      totalSignups: totalStats.totalSignups || 0,
      totalErrors: totalStats.totalErrors || 0,
      averageLoginDuration: Number(totalStats.averageLoginDuration) || 0,
      successRate,
      topErrorTypes: topErrorTypes.map(item => ({
        type: item.type || 'Unknown',
        count: item.count,
      })),
      loginsByProvider: loginsByProvider.map(item => ({
        provider: item.provider || 'Unknown',
        count: item.count,
      })),
      dailyStats: dailyStats.map(item => ({
        date: item.date,
        logins: item.logins || 0,
        signups: item.signups || 0,
        errors: item.errors || 0,
      })),
    };
  } catch (error) {
    console.error('Failed to get auth analytics:', error);
    throw error;
  }
}

/**
 * Performance monitoring wrapper for authentication operations
 */
export function withAuthMonitoring<T extends (...args: any[]) => Promise<any>>(
  operation: string,
  fn: T
): T {
  return (async (...args: Parameters<T>) => {
    const startTime = Date.now();
    let success = false;
    let error: Error | null = null;

    try {
      const result = await fn(...args);
      success = true;
      return result;
    } catch (err) {
      error = err as Error;
      success = false;
      throw err;
    } finally {
      // Record performance metric
      await recordAuthPerformance(operation, startTime, success, {
        args: args.length,
        error: error?.message,
      });

      // Record error if one occurred
      if (error) {
        await recordAuthError(error, {
          operation,
          metadata: { args: args.length },
        });
      }
    }
  }) as T;
}

/**
 * Gets real-time authentication metrics
 */
export async function getRealTimeAuthMetrics(): Promise<{
  activeUsers: number;
  recentLogins: number;
  recentErrors: number;
  averageResponseTime: number;
}> {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  try {
    // Recent logins (last hour)
    const [recentLoginsData] = await db
      .select({ count: count() })
      .from(authMetrics)
      .where(
        and(
          gte(authMetrics.timestamp, oneHourAgo),
          eq(authMetrics.event, 'login'),
          eq(authMetrics.success, true)
        )
      );

    // Recent errors (last hour)
    const [recentErrorsData] = await db
      .select({ count: count() })
      .from(authMetrics)
      .where(
        and(
          gte(authMetrics.timestamp, oneHourAgo),
          eq(authMetrics.success, false)
        )
      );

    // Average response time (last 5 minutes)
    const [avgResponseData] = await db
      .select({ avg: avg(authMetrics.duration) })
      .from(authMetrics)
      .where(
        and(
          gte(authMetrics.timestamp, fiveMinutesAgo),
          sql`duration IS NOT NULL`
        )
      );

    // Active users (users with sessions in last hour)
    const [activeUsersData] = await db
      .select({ count: count(sql`DISTINCT user_id`) })
      .from(authSessions)
      .where(gte(authSessions.timestamp, oneHourAgo));

    return {
      activeUsers: activeUsersData.count || 0,
      recentLogins: recentLoginsData.count || 0,
      recentErrors: recentErrorsData.count || 0,
      averageResponseTime: Number(avgResponseData.avg) || 0,
    };
  } catch (error) {
    console.error('Failed to get real-time auth metrics:', error);
    return {
      activeUsers: 0,
      recentLogins: 0,
      recentErrors: 0,
      averageResponseTime: 0,
    };
  }
}