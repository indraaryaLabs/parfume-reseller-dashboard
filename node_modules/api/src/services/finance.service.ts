import { db } from '../db/index.js';
import { transaction } from '../db/schema.js';
import { eq, and, desc, sql } from 'drizzle-orm';

export const financeService = {
  async listTransactions(filters: { type?: string; month?: number; year?: number } = {}) {
    const conditions = [];
    if (filters.type) conditions.push(eq(transaction.type, filters.type as any));
    if (filters.month && filters.year) {
      const startDate = `${filters.year}-${String(filters.month).padStart(2, '0')}-01`;
      const endMonth = filters.month === 12 ? 1 : filters.month + 1;
      const endYear = filters.month === 12 ? filters.year + 1 : filters.year;
      const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
      conditions.push(sql`${transaction.date} >= ${startDate}`);
      conditions.push(sql`${transaction.date} < ${endDate}`);
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    return db.select().from(transaction).where(where).orderBy(desc(transaction.date));
  },

  async create(data: typeof transaction.$inferInsert) {
    const [created] = await db.insert(transaction).values(data).returning();
    return created;
  },

  async getSummary(month?: number, year?: number) {
    const conditions = [];
    if (month && year) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endMonth = month === 12 ? 1 : month + 1;
      const endYear = month === 12 ? year + 1 : year;
      const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
      conditions.push(sql`${transaction.date} >= ${startDate}`);
      conditions.push(sql`${transaction.date} < ${endDate}`);
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select({
        type: transaction.type,
        total: sql<number>`sum(${transaction.amount})`,
      })
      .from(transaction)
      .where(where)
      .groupBy(transaction.type);

    const income = Number(result.find((r) => r.type === 'INCOME')?.total ?? 0);
    const expense = Number(result.find((r) => r.type === 'EXPENSE')?.total ?? 0);

    return { income, expense, net: income - expense };
  },
};
