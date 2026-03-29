import { db } from '../db/index.js';
import { order, orderItem, product, transaction } from '../db/schema.js';
import { eq, sql, desc, lte } from 'drizzle-orm';

export const analyticsService = {
  async getOverview(month: number, year: number) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

    const result = await db
      .select({
        type: transaction.type,
        total: sql<number>`sum(${transaction.amount})`,
      })
      .from(transaction)
      .where(sql`${transaction.date} >= ${startDate} AND ${transaction.date} < ${endDate}`)
      .groupBy(transaction.type);

    const income = Number(result.find((r) => r.type === 'INCOME')?.total ?? 0);
    const expense = Number(result.find((r) => r.type === 'EXPENSE')?.total ?? 0);

    return {
      revenue: income,
      expense,
      profit: income - expense,
    };
  },

  async getSalesByBrand() {
    const result = await db
      .select({
        brand: orderItem.brand,
        totalSold: sql<number>`sum(${orderItem.quantity})`,
      })
      .from(orderItem)
      .groupBy(orderItem.brand)
      .orderBy(desc(sql`sum(${orderItem.quantity})`));

    const grandTotal = result.reduce((sum, r) => sum + Number(r.totalSold), 0);

    return result.map((r) => ({
      brand: r.brand,
      totalSold: Number(r.totalSold),
      percentage: grandTotal > 0 ? Math.round((Number(r.totalSold) / grandTotal) * 100) : 0,
    }));
  },

  async getTopProducts(limit: number = 5) {
    return db
      .select({
        productId: orderItem.productId,
        name: orderItem.name,
        brand: orderItem.brand,
        totalSold: sql<number>`sum(${orderItem.quantity})`,
      })
      .from(orderItem)
      .groupBy(orderItem.productId, orderItem.name, orderItem.brand)
      .orderBy(desc(sql`sum(${orderItem.quantity})`))
      .limit(limit);
  },

  async getRevenueChart(year: number) {
    const result = await db
      .select({
        month: sql<number>`extract(month from ${transaction.date}::date)`,
        type: transaction.type,
        total: sql<number>`sum(${transaction.amount})`,
      })
      .from(transaction)
      .where(sql`extract(year from ${transaction.date}::date) = ${year}`)
      .groupBy(sql`extract(month from ${transaction.date}::date)`, transaction.type)
      .orderBy(sql`extract(month from ${transaction.date}::date)`);

    return result;
  },

  async getStockAlerts(threshold: number = 5) {
    return db
      .select()
      .from(product)
      .where(lte(product.stock, threshold))
      .orderBy(product.stock);
  },

  async getDashboardKpis() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const overview = await this.getOverview(month, year);
    const pendingOrders = await db
      .select({ count: sql<number>`count(*)` })
      .from(order)
      .where(eq(order.status, 'BARU'));

    return {
      ...overview,
      pendingOrders: Number(pendingOrders[0]?.count ?? 0),
    };
  },
};
