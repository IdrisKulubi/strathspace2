import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { users, accounts, sessions, verificationTokens } from "../db/schema";
import db from "../db/drizzle";
import { eq } from "drizzle-orm";
import {
  validateAndNormalizeEmail,
  logSuccessfulAuth,
  logAuthError,
  getEmailDomainInfo,
} from "./auth/validation";
import {
  recordAuthMetric,
  recordAuthError,
  trackAuthSession,
  withAuthMonitoring,
} from "./auth/monitoring";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verificationTokens,
    },
  }),
  emailAndPassword: {
    enabled: false, // Disable email/password auth - Google OAuth only
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["openid", "email", "profile"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days as per requirements
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      profileCompleted: {
        type: "boolean",
        defaultValue: false,
      },
      hasProfile: {
        type: "boolean",
        defaultValue: false,
      },
      phoneNumber: {
        type: "string",
        required: true,
      },
      googleId: {
        type: "string",
        required: false,
      },
      googleProfileData: {
        type: "string",
        required: false,
      },
    },
  },
  rateLimit: {
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  // Email verification settings (disabled since we trust Google OAuth)
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
  },
  
  // Next.js specific plugins
  plugins: [
    nextCookies(), // Automatically handle cookies in server actions
  ],
  callbacks: {
    async onSignUp({
      user,
      account,
      request,
    }: {
      user: any;
      account: any;
      request: any;
    }) {
      const startTime = Date.now();
      try {
        // Validate and normalize email (allows all valid email formats)
        const normalizedEmail = validateAndNormalizeEmail(user.email);
        const emailInfo = getEmailDomainInfo(normalizedEmail);

        console.log(`New user signed up: ${normalizedEmail}`, {
          userId: user.id,
          domain: emailInfo.domain,
          isEducational: emailInfo.isEducational,
          isCommonProvider: emailInfo.isCommonProvider,
          timestamp: new Date().toISOString(),
        });

        // Store Google profile data if available
        if (account?.providerId === "google" && account.idToken) {
          // Extract Google profile data from ID token
          const googleProfile = {
            sub: account.accountId,
            name: user.name,
            given_name: user.name.split(" ")[0] || "",
            family_name: user.name.split(" ").slice(1).join(" ") || "",
            email: normalizedEmail,
            picture: user.image || "",
            email_verified: true,
          };

          // Update user with Google profile data
          await db
            .update(users)
            .set({
              googleId: account.accountId,
              googleProfileData: JSON.stringify(googleProfile),
              emailVerified: true,
              email: normalizedEmail, // Ensure normalized email is stored
            })
            .where(eq(users.id as any, user.id) as any);
        }

        // Record signup metric
        await recordAuthMetric({
          event: 'signup',
          userId: user.id,
          email: normalizedEmail,
          provider: account?.providerId || 'unknown',
          duration: Date.now() - startTime,
          success: true,
          userAgent: request?.headers?.get('user-agent') || undefined,
          ipAddress: request?.headers?.get('x-forwarded-for') || 
                     request?.headers?.get('x-real-ip') || undefined,
          timestamp: new Date(),
          metadata: {
            domain: emailInfo.domain,
            isEducational: emailInfo.isEducational,
            isCommonProvider: emailInfo.isCommonProvider,
          },
        });

        // Log successful authentication
        if (request) {
          logSuccessfulAuth(normalizedEmail, user.id, request);
        }

        return { user: { ...user, email: normalizedEmail } };
      } catch (error) {
        // Record signup error
        await recordAuthError(error as Error, {
          userId: user?.id,
          email: user?.email,
          operation: 'signup',
          userAgent: request?.headers?.get('user-agent') || undefined,
          ipAddress: request?.headers?.get('x-forwarded-for') || 
                     request?.headers?.get('x-real-ip') || undefined,
          metadata: {
            provider: account?.providerId,
            duration: Date.now() - startTime,
          },
        });

        if (request) {
          logAuthError(error as Error, user.email, request);
        }
        throw error;
      }
    },

    async onSignIn({
      user,
      account,
      request,
    }: {
      user: any;
      account: any;
      request: any;
    }) {
      const startTime = Date.now();
      try {
        // Validate and normalize email (allows all valid email formats)
        const normalizedEmail = validateAndNormalizeEmail(user.email);
        const emailInfo = getEmailDomainInfo(normalizedEmail);

        console.log(`User signed in: ${normalizedEmail}`, {
          userId: user.id,
          domain: emailInfo.domain,
          isEducational: emailInfo.isEducational,
          isCommonProvider: emailInfo.isCommonProvider,
          timestamp: new Date().toISOString(),
        });

        // Update last active timestamp
        await db
          .update(users)
          .set({
            lastActive: new Date(),
            isOnline: true,
            email: normalizedEmail, // Ensure normalized email is stored
          })
          .where(eq(users.id as any, user.id) as any);

        // Record login metric
        await recordAuthMetric({
          event: 'login',
          userId: user.id,
          email: normalizedEmail,
          provider: account?.providerId || 'unknown',
          duration: Date.now() - startTime,
          success: true,
          userAgent: request?.headers?.get('user-agent') || undefined,
          ipAddress: request?.headers?.get('x-forwarded-for') || 
                     request?.headers?.get('x-real-ip') || undefined,
          timestamp: new Date(),
          metadata: {
            domain: emailInfo.domain,
            isEducational: emailInfo.isEducational,
            isCommonProvider: emailInfo.isCommonProvider,
          },
        });

        // Log successful authentication
        if (request) {
          logSuccessfulAuth(normalizedEmail, user.id, request);
        }

        return { user: { ...user, email: normalizedEmail } };
      } catch (error) {
        // Record login error
        await recordAuthError(error as Error, {
          userId: user?.id,
          email: user?.email,
          operation: 'login',
          userAgent: request?.headers?.get('user-agent') || undefined,
          ipAddress: request?.headers?.get('x-forwarded-for') || 
                     request?.headers?.get('x-real-ip') || undefined,
          metadata: {
            provider: account?.providerId,
            duration: Date.now() - startTime,
          },
        });

        if (request) {
          logAuthError(error as Error, user.email, request);
        }
        throw error;
      }
    },

    async onError({ error, request }: { error: any; request: any }) {
      // Record auth error in monitoring system
      await recordAuthError(error, {
        operation: 'auth_callback',
        userAgent: request?.headers?.get('user-agent') || undefined,
        ipAddress: request?.headers?.get('x-forwarded-for') || 
                   request?.headers?.get('x-real-ip') || undefined,
        metadata: {
          errorName: error.name,
          errorCode: error.code,
        },
      });

      if (request) {
        logAuthError(error, undefined, request);
      } else {
        console.error("Better Auth Error:", {
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export type Session = typeof auth.$Infer.Session.session & {
  user: typeof auth.$Infer.Session.user;
};
export type User = typeof auth.$Infer.Session.user;
