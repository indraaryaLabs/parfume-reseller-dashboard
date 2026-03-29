import { db } from '../db/index.js';
import { review } from '../db/schema.js';
import { eq, desc, avg, sql } from 'drizzle-orm';

export const reviewService = {
  async listByProduct(productId: string) {
    return db
      .select()
      .from(review)
      .where(eq(review.productId, productId))
      .orderBy(desc(review.createdAt));
  },

  async create(data: { productId: string; userId: string; rating: number; comment?: string }) {
    const [created] = await db.insert(review).values(data).returning();
    return created;
  },

  async getAverageRating(productId: string) {
    const result = await db
      .select({ avg: avg(review.rating), count: sql<number>`count(*)` })
      .from(review)
      .where(eq(review.productId, productId));

    return {
      average: Number(result[0]?.avg ?? 0),
      count: Number(result[0]?.count ?? 0),
    };
  },
};
