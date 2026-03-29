import { db } from '../db/index.js';
import { promo } from '../db/schema.js';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

export const promoService = {
  async listActive() {
    const now = new Date();
    return db
      .select()
      .from(promo)
      .where(
        and(
          eq(promo.isActive, true),
        )
      )
      .orderBy(desc(promo.createdAt));
  },

  async getById(id: string) {
    return db.query.promo.findFirst({ where: eq(promo.id, id) });
  },

  async create(data: typeof promo.$inferInsert) {
    const [created] = await db.insert(promo).values(data).returning();
    return created;
  },

  async update(id: string, data: Partial<typeof promo.$inferInsert>) {
    const [updated] = await db
      .update(promo)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(promo.id, id))
      .returning();
    return updated;
  },

  async delete(id: string) {
    await db.delete(promo).where(eq(promo.id, id));
  },
};
