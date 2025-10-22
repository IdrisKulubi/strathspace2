import db from "@/app/db/drizzle";
import { users, accounts, sessions, verificationTokens } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Better Auth database adapter for existing schema
 * Implements user, session, and account operations with secure token handling
 */

export interface CreateUserData {
  id?: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string;
  role?: "user" | "admin";
  phoneNumber: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  emailVerified?: Date | null;
  image?: string;
  lastActive?: Date;
  isOnline?: boolean;
  phoneNumber?: string;
}

export interface CreateSessionData {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface UpdateSessionData {
  expiresAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface CreateAccountData {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
}

export interface AccountData {
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
}

export interface CreateTokenData {
  id: string;
  identifier: string;
  token: string;
  expiresAt: Date;
}

/**
 * Database adapter implementation for Better Auth
 */
export const betterAuthAdapter = {
  user: {
    /**
     * Create a new user in the database
     */
    async create(data: CreateUserData) {
      const [user] = await db
        .insert(users)
        .values({
          id: data.id || crypto.randomUUID(),
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
          role: data.role || "user",
          phoneNumber: data.phoneNumber,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastActive: new Date(),
          isOnline: false,
        })
        .returning();
      
      return user;
    },

    /**
     * Find user by email address
     */
    async findByEmail(email: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      return user || null;
    },

    /**
     * Find user by ID
     */
    async findById(id: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      
      return user || null;
    },

    /**
     * Update user information
     */
    async update(id: string, data: UpdateUserData) {
      const [user] = await db
        .update(users)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();
      
      return user;
    },

    /**
     * Delete user from database
     */
    async delete(id: string) {
      await db.delete(users).where(eq(users.id, id));
    },
  },

  session: {
    /**
     * Create a new session with secure token handling
     */
    async create(data: CreateSessionData) {
      const [session] = await db
        .insert(sessions)
        .values({
          id: data.id,
          token: data.token,
          userId: data.userId,
          expiresAt: data.expiresAt,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      
      return session;
    },

    /**
     * Find session by token
     */
    async findByToken(token: string) {
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.token, token))
        .limit(1);
      
      return session || null;
    },

    /**
     * Update session information
     */
    async update(token: string, data: UpdateSessionData) {
      const [session] = await db
        .update(sessions)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(sessions.token, token))
        .returning();
      
      return session;
    },

    /**
     * Delete session by token
     */
    async delete(token: string) {
      await db.delete(sessions).where(eq(sessions.token, token));
    },

    /**
     * Clean up expired sessions
     */
    async deleteExpired() {
      const now = new Date();
      await db.delete(sessions).where(eq(sessions.expiresAt, now));
    },
  },

  account: {
    /**
     * Create OAuth account for provider linking
     */
    async create(data: CreateAccountData) {
      const [account] = await db
        .insert(accounts)
        .values({
          id: data.id,
          accountId: data.accountId,
          providerId: data.providerId,
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          idToken: data.idToken,
          accessTokenExpiresAt: data.accessTokenExpiresAt,
          refreshTokenExpiresAt: data.refreshTokenExpiresAt,
          scope: data.scope,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      
      return account;
    },

    /**
     * Find account by provider and account ID
     */
    async findByProvider(providerId: string, accountId: string) {
      const [account] = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerId, providerId),
            eq(accounts.accountId, accountId)
          )
        )
        .limit(1);
      
      return account || null;
    },

    /**
     * Link OAuth account to existing user
     */
    async linkToUser(userId: string, accountData: AccountData) {
      const [account] = await db
        .insert(accounts)
        .values({
          id: crypto.randomUUID(),
          accountId: accountData.accountId,
          providerId: accountData.providerId,
          userId,
          accessToken: accountData.accessToken,
          refreshToken: accountData.refreshToken,
          idToken: accountData.idToken,
          accessTokenExpiresAt: accountData.accessTokenExpiresAt,
          refreshTokenExpiresAt: accountData.refreshTokenExpiresAt,
          scope: accountData.scope,
          password: accountData.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      
      return account;
    },
  },

  verificationToken: {
    /**
     * Create verification token
     */
    async create(data: CreateTokenData) {
      const [token] = await db
        .insert(verificationTokens)
        .values({
          id: data.id,
          identifier: data.identifier,
          token: data.token,
          expiresAt: data.expiresAt,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      
      return token;
    },

    /**
     * Find verification token
     */
    async findByToken(token: string) {
      const [verificationToken] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);
      
      return verificationToken || null;
    },

    /**
     * Delete verification token
     */
    async delete(token: string) {
      await db.delete(verificationTokens).where(eq(verificationTokens.token, token));
    },
  },
};

export default betterAuthAdapter;