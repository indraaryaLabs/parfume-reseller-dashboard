import { db } from '../db/index.js';
import { product, productImage } from '../db/schema.js';
import { eq, ilike, and, gte, lte, desc, asc, inArray, or, sql } from 'drizzle-orm';

export interface ProductFilters {
  brand?: string;
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  async list(filters: ProductFilters = {}) {
    const { brand, category, status, minPrice, maxPrice, search, sort = 'newest', page = 1, limit = 12 } = filters;
    const conditions = [];

    if (brand) conditions.push(eq(product.brand, brand));
    if (category) conditions.push(eq(product.category, category));
    if (status) conditions.push(eq(product.status, status as any));
    if (minPrice) conditions.push(gte(product.price, minPrice));
    if (maxPrice) conditions.push(lte(product.price, maxPrice));
    if (search) {
      conditions.push(
        or(ilike(product.name, `%${search}%`), ilike(product.brand, `%${search}%`))!
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const orderBy = sort === 'price_asc'
      ? asc(product.price)
      : sort === 'price_desc'
        ? desc(product.price)
        : desc(product.createdAt);

    const offset = (page - 1) * limit;

    const [items, countResult] = await Promise.all([
      db.select().from(product).where(where).orderBy(orderBy).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(product).where(where),
    ]);

    return {
      items,
      total: Number(countResult[0]?.count ?? 0),
      page,
      limit,
      totalPages: Math.ceil(Number(countResult[0]?.count ?? 0) / limit),
    };
  },

  async getById(id: string) {
    const p = await db.query.product.findFirst({ where: eq(product.id, id) });
    if (!p) return null;

    const images = await db.select().from(productImage).where(eq(productImage.productId, id)).orderBy(asc(productImage.sortOrder));

    return { ...p, images };
  },

  async create(data: typeof product.$inferInsert) {
    const [created] = await db.insert(product).values(data).returning();
    return created;
  },

  async update(id: string, data: Partial<typeof product.$inferInsert>) {
    const [updated] = await db
      .update(product)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(product.id, id))
      .returning();
    return updated;
  },

  async delete(id: string) {
    await db.delete(product).where(eq(product.id, id));
  },

  async bulkDelete(ids: string[]) {
    await db.delete(product).where(inArray(product.id, ids));
  },

  async bulkUpdateStatus(ids: string[], status: string) {
    await db
      .update(product)
      .set({ status: status as any, updatedAt: new Date() })
      .where(inArray(product.id, ids));
  },

  async addImage(productId: string, url: string, sortOrder: number = 0) {
    const [img] = await db.insert(productImage).values({ productId, url, sortOrder }).returning();
    return img;
  },

  async deleteImage(imageId: string) {
    await db.delete(productImage).where(eq(productImage.id, imageId));
  },
};
