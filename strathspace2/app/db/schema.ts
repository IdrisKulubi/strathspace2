import { relations, sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  integer,
  boolean,
  uuid,
  json,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
// Better Auth types will be imported when needed

// First define all tables
export const users = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    role: text("role").default("user"),
    profileCompleted: boolean("profile_completed").default(false),
    hasProfile: boolean("has_profile").default(false),
    phoneNumber: text("phone_number").notNull(),
    googleId: text("google_id"),
    googleProfileData: text("google_profile_data"),
    // Additional fields for the app
    lastActive: timestamp("last_active").defaultNow().notNull(),
    isOnline: boolean("is_online").default(false),
    profilePhoto: text("profile_photo"),
  },
  (table) => ({
    emailIdx: index("user_email_idx").on(table.email),
    createdAtIdx: index("user_created_at_idx").on(table.createdAt),
    lastActiveIdx: index("user_last_active_idx").on(table.lastActive),
    googleIdIdx: index("user_google_id_idx").on(table.googleId),
  })
);

// Better Auth tables
export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const verificationTokens = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Extended user profiles
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio"),
  age: integer("age"),
  gender: text("gender"),
  role: text("role").$type<"user" | "admin">().default("user"),
  interests: json("interests").$type<string[]>(),
  photos: json("photos").$type<string[]>(),
  isVisible: boolean("is_visible").default(true),
  lastActive: timestamp("last_active").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isComplete: boolean("is_complete").default(false),
  profileCompleted: boolean("profile_completed").default(false),
  lookingFor: text("looking_for"),
  course: text("course"),
  yearOfStudy: integer("year_of_study"),
  instagram: text("instagram"),
  spotify: text("spotify"),
  snapchat: text("snapchat"),
  profilePhoto: text("profile_photo"),
  phoneNumber: text("phone_number"),
  firstName: text("first_name").notNull().default(""),
  lastName: text("last_name").notNull().default(""),
  isMatch: boolean("is_match").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  anonymous: boolean("anonymous").default(false),
  anonymousAvatar: text("anonymous_avatar"),
  anonymousRevealRequested: boolean("anonymous_reveal_requested").default(
    false
  ),
  drinkingPreference: text("drinking_preference"),
  workoutFrequency: text("workout_frequency"),
  socialMediaUsage: text("social_media_usage"),
  sleepingHabits: text("sleeping_habits"),
  personalityType: text("personality_type"),
  communicationStyle: text("communication_style"),
  loveLanguage: text("love_language"),
  zodiacSign: text("zodiac_sign"),
  visibilityMode: text("visibility_mode").default("standard"),
  incognitoMode: boolean("incognito_mode").default(false),
  discoveryPaused: boolean("discovery_paused").default(false),
  readReceiptsEnabled: boolean("read_receipts_enabled").default(true),
  showActiveStatus: boolean("show_active_status").default(true),
  username: text("username"),
});

// Indexes for the profiles table (defined externally)
export const profileUserIdIdx = index("profile_user_id_idx").on(sql`user_id`);
export const profileIsVisibleIdx = index("profile_is_visible_idx").on(
  sql`is_visible`
);
export const profileGenderIdx = index("profile_gender_idx").on(sql`gender`);
export const profileLastActiveIdx = index("profile_last_active_idx").on(
  sql`last_active`
);
export const profileCompletedIdx = index("profile_completed_idx").on(
  sql`profile_completed`
);
export const profileUsernameIdx = index("profile_username_idx").on(
  sql`username`
);
export const profileAnonymousIdx = index("profile_anonymous_idx").on(
  sql`anonymous`
);

// Swipes/Likes
export const swipes = pgTable(
  "swipes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    swiperId: text("swiper_id")
      .notNull()
      .references(() => users.id),
    swipedId: text("swiped_id")
      .notNull()
      .references(() => users.id),
    isLike: boolean("is_like").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    swiperIdx: index("swipe_swiper_idx").on(table.swiperId),
    swipedIdx: index("swipe_swiped_idx").on(table.swipedId),
    createdAtIdx: index("swipe_created_at_idx").on(table.createdAt),
    swipeComboIdx: index("swipe_combo_idx").on(table.swiperId, table.swipedId),
  })
);

// Matches
export const matches = pgTable(
  "matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user1Id: text("user1_id")
      .notNull()
      .references(() => users.id),
    user2Id: text("user2_id")
      .notNull()
      .references(() => users.id),
    user1Typing: boolean("user1_typing").default(false),
    user2Typing: boolean("user2_typing").default(false),
    lastMessageAt: timestamp("last_message_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("match_users_idx").on(table.user1Id, table.user2Id),
    lastMessageIdx: index("last_message_idx").on(table.lastMessageAt),
  })
);

export const feedbacks = pgTable("feedbacks", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  phoneNumber: text("phone_number"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages
export const messages = pgTable(
  "messages",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    matchId: uuid("match_id")
      .references(() => matches.id)
      .notNull(),
    senderId: text("sender_id")
      .references(() => users.id)
      .notNull(),
    status: text("status", { enum: ["sent", "delivered", "read"] })
      .default("sent")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    matchIdIdx: index("match_id_idx").on(table.matchId),
    senderIdIdx: index("sender_id_idx").on(table.senderId),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
    // Composite index for efficient message pagination queries
    matchIdCreatedAtIdx: index("match_id_created_at_idx").on(table.matchId, table.createdAt),
  })
);

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

// Blocks
export const blocks = pgTable("blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  blockerId: text("blocker_id")
    .notNull()
    .references(() => users.id),
  blockedId: text("blocked_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Starred Profiles
export const starredProfiles = pgTable("starred_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  starredId: text("starred_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reports
export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reporterId: text("reporter_id")
      .notNull()
      .references(() => users.id),
    reportedUserId: text("reported_user_id")
      .notNull()
      .references(() => users.id),
    reason: text("reason").notNull(),
    status: text("status").$type<"PENDING" | "RESOLVED">().default("PENDING"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    resolvedAt: timestamp("resolved_at"),
    adminNotes: text("admin_notes"),
  },
  (table) => ({
    reportedIdx: index("reported_user_idx").on(table.reportedUserId),
    statusIdx: index("report_status_idx").on(table.status),
  })
);

// Profile Views
export const profileViews = pgTable(
  "profile_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    viewerId: text("viewer_id")
      .notNull()
      .references(() => users.id),
    viewedId: text("viewed_id")
      .notNull()
      .references(() => users.id),
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
    source: text("source")
      .$type<"VIEW_MORE" | "PROFILE_CARD" | "SEARCH" | "MATCHES">()
      .default("VIEW_MORE"),
    viewDuration: integer("view_duration"),
  },
  (table) => ({
    viewerIdx: index("profile_views_viewer_idx").on(table.viewerId),
    viewedIdx: index("profile_views_viewed_idx").on(table.viewedId),
    viewedAtIdx: index("profile_views_viewed_at_idx").on(table.viewedAt),
  })
);

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  sentSwipes: many(swipes, { relationName: "swiperRelation" }),
  receivedSwipes: many(swipes, { relationName: "swipedRelation" }),
  matches1: many(matches, { relationName: "user1Relation" }),
  matches2: many(matches, { relationName: "user2Relation" }),
  starredProfiles: many(starredProfiles, {
    relationName: "userStarredProfiles",
  }),
  reports: many(reports, { relationName: "userReports" }),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
  messages: many(messages, { relationName: "matchMessages" }),
  user1: one(users, {
    fields: [matches.user1Id],
    references: [users.id],
  }),
  user2: one(users, {
    fields: [matches.user2Id],
    references: [users.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  reporter: one(users, {
    fields: [reports.reporterId],
    references: [users.id],
  }),
  reportedUser: one(users, {
    fields: [reports.reportedUserId],
    references: [users.id],
  }),
}));

export const profileViewsRelations = relations(profileViews, ({ one }) => ({
  viewer: one(users, {
    fields: [profileViews.viewerId],
    references: [users.id],
    relationName: "profileViewer",
  }),
  viewed: one(users, {
    fields: [profileViews.viewedId],
    references: [users.id],
    relationName: "profileViewed",
  }),
}));

// Then create type references at the end
export type Profile = typeof profiles.$inferSelect & {
  isMatch: boolean | null;
  userId: string;
  unreadMessages?: number;
  matchId?: string;
};

// Authentication monitoring tables
export const authMetrics = pgTable(
  "auth_metrics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    event: text("event").notNull(), // 'login', 'logout', 'signup', 'error', 'session_refresh'
    userId: text("user_id").references(() => users.id),
    email: text("email"),
    provider: text("provider"), // 'google', 'email', etc.
    duration: integer("duration"), // in milliseconds
    success: boolean("success").notNull(),
    errorType: text("error_type"),
    errorMessage: text("error_message"),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
    metadata: text("metadata"), // JSON string for additional data
  },
  (table) => ({
    eventIdx: index("auth_metrics_event_idx").on(table.event),
    timestampIdx: index("auth_metrics_timestamp_idx").on(table.timestamp),
    userIdIdx: index("auth_metrics_user_id_idx").on(table.userId),
    successIdx: index("auth_metrics_success_idx").on(table.success),
    providerIdx: index("auth_metrics_provider_idx").on(table.provider),
  })
);

export const authSessions = pgTable(
  "auth_sessions_tracking",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: text("session_id").notNull(),
    userId: text("user_id").notNull().references(() => users.id),
    action: text("action").notNull(), // 'created', 'refreshed', 'expired', 'revoked'
    timestamp: timestamp("timestamp").defaultNow().notNull(),
    metadata: text("metadata"), // JSON string for additional data
  },
  (table) => ({
    sessionIdIdx: index("auth_sessions_tracking_session_id_idx").on(table.sessionId),
    userIdIdx: index("auth_sessions_tracking_user_id_idx").on(table.userId),
    timestampIdx: index("auth_sessions_tracking_timestamp_idx").on(table.timestamp),
    actionIdx: index("auth_sessions_tracking_action_idx").on(table.action),
  })
);

export const authErrors = pgTable(
  "auth_errors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    errorType: text("error_type").notNull(),
    errorMessage: text("error_message").notNull(),
    stackTrace: text("stack_trace"),
    userId: text("user_id").references(() => users.id),
    email: text("email"),
    operation: text("operation"), // 'login', 'signup', 'session_refresh', etc.
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
    metadata: text("metadata"), // JSON string for additional data
  },
  (table) => ({
    errorTypeIdx: index("auth_errors_error_type_idx").on(table.errorType),
    timestampIdx: index("auth_errors_timestamp_idx").on(table.timestamp),
    userIdIdx: index("auth_errors_user_id_idx").on(table.userId),
    operationIdx: index("auth_errors_operation_idx").on(table.operation),
  })
);

// Export the Message type if needed
export type Message = typeof messages.$inferSelect;

export type ProfileView = typeof profileViews.$inferSelect;

export type AuthMetric = typeof authMetrics.$inferSelect;
export type AuthSession = typeof authSessions.$inferSelect;
export type AuthError = typeof authErrors.$inferSelect;
