import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users, accounts, sessions, verificationTokens } from "../db/schema";
import db from "../db/drizzle";
import { eq } from "drizzle-orm";
import {
  validateAndNormalizeEmail,
  logSuccessfulAuth,
  logAuthError,
  getEmailDomainInfo,
} from "./auth/validation";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users,
      accounts,
      sessions,
      verificationTokens,
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
              googleProfileData: googleProfile,
              emailVerified: new Date(),
              email: normalizedEmail, // Ensure normalized email is stored
            })
            .where(eq(users.id, user.id) as any);
        }

        // Log successful authentication
        if (request) {
          logSuccessfulAuth(normalizedEmail, user.id, request);
        }

        return { user: { ...user, email: normalizedEmail } };
      } catch (error) {
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
          .where(eq(users.id, user.id) as any);

        // Log successful authentication
        if (request) {
          logSuccessfulAuth(normalizedEmail, user.id, request);
        }

        return { user: { ...user, email: normalizedEmail } };
      } catch (error) {
        if (request) {
          logAuthError(error as Error, user.email, request);
        }
        throw error;
      }
    },

    async onError({ error, request }: { error: any; request: any }) {
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
