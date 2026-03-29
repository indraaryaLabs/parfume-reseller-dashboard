import { db } from '../db/index.js';
import { address } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

export const addressService = {
  async listByUser(userId: string) {
    return db.select().from(address).where(eq(address.userId, userId));
  },

  async create(userId: string, data: Omit<typeof address.$inferInsert, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    // If setting as primary, unset all others first
    if (data.isPrimary) {
      await db.update(address).set({ isPrimary: false }).where(eq(address.userId, userId));
    }

    const [created] = await db.insert(address).values({ ...data, userId }).returning();
    return created;
  },

  async update(id: string, userId: string, data: Partial<typeof address.$inferInsert>) {
    if (data.isPrimary) {
      await db.update(address).set({ isPrimary: false }).where(eq(address.userId, userId));
    }

    const [updated] = await db
      .update(address)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(address.id, id), eq(address.userId, userId)))
      .returning();
    return updated;
  },

  async delete(id: string, userId: string) {
    await db.delete(address).where(and(eq(address.id, id), eq(address.userId, userId)));
  },

  async setPrimary(id: string, userId: string) {
    await db.update(address).set({ isPrimary: false }).where(eq(address.userId, userId));
    const [updated] = await db
      .update(address)
      .set({ isPrimary: true, updatedAt: new Date() })
      .where(and(eq(address.id, id), eq(address.userId, userId)))
      .returning();
    return updated;
  },
};
