import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users, accounts, sessions, verificationTokens } from "../db/schema";
import db from "../db/drizzle";
import { eq } from "drizzle-orm";

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
    async onSignUp({ user, account }: { user: any; account: any }) {
      // Validate Strathmore email domain
      if (!user.email.endsWith("@strathmore.edu")) {
        throw new Error("Only Strathmore University email addresses are allowed");
      }
      
      // Store Google profile data if available
      if (account?.providerId === "google" && account.idToken) {
        // Extract Google profile data from ID token
        const googleProfile = {
          sub: account.accountId,
          name: user.name,
          given_name: user.name.split(" ")[0] || "",
          family_name: user.name.split(" ").slice(1).join(" ") || "",
          email: user.email,
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
          })
          .where(eq(users.id, user.id) as any);
      }
      
      return user;
    },
    
    async onSignIn({ user, account }: { user: any; account: any }) {
      // Validate Strathmore email domain on every sign-in
      if (!user.email.endsWith("@strathmore.edu")) {
        throw new Error("Only Strathmore University email addresses are allowed");
      }
      
      // Update last active timestamp
      await db
        .update(users)
        .set({
          lastActive: new Date(),
          isOnline: true,
        })
        .where(eq(users.id, user.id));
      
      return user;
    },
    
    async onError({ error, request }: { error: any; request: any }) {
      console.error("Better Auth Error:", error);
      
      // Log security-related errors
      if (error.message.includes("Strathmore")) {
        console.warn("Rejected non-Strathmore email attempt:", {
          ip: request.headers.get("x-forwarded-for") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
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