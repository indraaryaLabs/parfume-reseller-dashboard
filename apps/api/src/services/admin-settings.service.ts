import { db } from '../db/index.js';
import {
  storeSettings,
  paymentMethod,
  qrisConfig,
  shippingMethod,
  shippingSettings,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const adminSettingsService = {
  // ── Store ──────────────────────────────────────────
  async getStore() {
    const settings = await db.select().from(storeSettings).limit(1);
    return settings[0] ?? null;
  },

  async updateStore(data: Partial<typeof storeSettings.$inferInsert>) {
    const existing = await this.getStore();
    if (existing) {
      const [updated] = await db
        .update(storeSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(storeSettings.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(storeSettings).values(data as any).returning();
    return created;
  },

  // ── Payment Methods ────────────────────────────────
  async listPaymentMethods() {
    return db.select().from(paymentMethod);
  },

  async createPaymentMethod(data: typeof paymentMethod.$inferInsert) {
    const [created] = await db.insert(paymentMethod).values(data).returning();
    return created;
  },

  async updatePaymentMethod(id: string, data: Partial<typeof paymentMethod.$inferInsert>) {
    const [updated] = await db
      .update(paymentMethod)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(paymentMethod.id, id))
      .returning();
    return updated;
  },

  async deletePaymentMethod(id: string) {
    await db.delete(paymentMethod).where(eq(paymentMethod.id, id));
  },

  // ── QRIS ───────────────────────────────────────────
  async getQris() {
    const config = await db.select().from(qrisConfig).limit(1);
    return config[0] ?? null;
  },

  async updateQris(data: Partial<typeof qrisConfig.$inferInsert>) {
    const existing = await this.getQris();
    if (existing) {
      const [updated] = await db
        .update(qrisConfig)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(qrisConfig.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(qrisConfig).values(data as any).returning();
    return created;
  },

  // ── Shipping Methods ───────────────────────────────
  async listShippingMethods() {
    return db.select().from(shippingMethod);
  },

  async createShippingMethod(data: typeof shippingMethod.$inferInsert) {
    const [created] = await db.insert(shippingMethod).values(data).returning();
    return created;
  },

  async updateShippingMethod(id: string, data: Partial<typeof shippingMethod.$inferInsert>) {
    const [updated] = await db
      .update(shippingMethod)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(shippingMethod.id, id))
      .returning();
    return updated;
  },

  async deleteShippingMethod(id: string) {
    await db.delete(shippingMethod).where(eq(shippingMethod.id, id));
  },

  // ── Shipping Settings ──────────────────────────────
  async getShippingSettings() {
    const settings = await db.select().from(shippingSettings).limit(1);
    return settings[0] ?? null;
  },

  async updateShippingSettings(data: Partial<typeof shippingSettings.$inferInsert>) {
    const existing = await this.getShippingSettings();
    if (existing) {
      const [updated] = await db
        .update(shippingSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(shippingSettings.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(shippingSettings).values(data as any).returning();
    return created;
  },
};
