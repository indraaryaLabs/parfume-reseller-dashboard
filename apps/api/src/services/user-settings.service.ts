import { db } from '../db/index.js';
import { userProfile, notificationPreference } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const userSettingsService = {
  // ── Profile ────────────────────────────────────────
  async getProfile(userId: string) {
    return db.query.userProfile.findFirst({ where: eq(userProfile.userId, userId) });
  },

  async upsertProfile(
    userId: string,
    data: Partial<Omit<typeof userProfile.$inferInsert, 'id' | 'userId'>>
  ) {
    const existing = await this.getProfile(userId);
    if (existing) {
      const [updated] = await db
        .update(userProfile)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(userProfile.userId, userId))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(userProfile)
      .values({ ...data, userId } as any)
      .returning();
    return created;
  },

  // ── Notifications ──────────────────────────────────
  async getNotificationPrefs(userId: string) {
    return db.query.notificationPreference.findFirst({
      where: eq(notificationPreference.userId, userId),
    });
  },

  async upsertNotificationPrefs(
    userId: string,
    data: Partial<Omit<typeof notificationPreference.$inferInsert, 'id' | 'userId'>>
  ) {
    const existing = await this.getNotificationPrefs(userId);
    if (existing) {
      const [updated] = await db
        .update(notificationPreference)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(notificationPreference.userId, userId))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(notificationPreference)
      .values({ ...data, userId } as any)
      .returning();
    return created;
  },
};
