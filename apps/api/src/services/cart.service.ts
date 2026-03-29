import { db } from '../db/index.js';
import { cartItem, product } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

export const cartService = {
  async getByUser(userId: string) {
    const items = await db
      .select()
      .from(cartItem)
      .where(eq(cartItem.userId, userId))
      .innerJoin(product, eq(cartItem.productId, product.id));

    return items.map((i) => ({
      id: i.cart_item.id,
      productId: i.product.id,
      name: i.product.name,
      brand: i.product.brand,
      price: i.product.price,
      image: i.product.status, // Will be replaced with actual image logic
      quantity: i.cart_item.quantity,
      stock: i.product.stock,
    }));
  },

  async addItem(userId: string, productId: string, quantity: number = 1) {
    // Check if item already exists
    const existing = await db.query.cartItem.findFirst({
      where: and(eq(cartItem.userId, userId), eq(cartItem.productId, productId)),
    });

    if (existing) {
      const [updated] = await db
        .update(cartItem)
        .set({ quantity: existing.quantity + quantity, updatedAt: new Date() })
        .where(eq(cartItem.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(cartItem)
      .values({ userId, productId, quantity })
      .returning();
    return created;
  },

  async updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      await db.delete(cartItem).where(eq(cartItem.id, itemId));
      return null;
    }

    const [updated] = await db
      .update(cartItem)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItem.id, itemId))
      .returning();
    return updated;
  },

  async removeItem(itemId: string) {
    await db.delete(cartItem).where(eq(cartItem.id, itemId));
  },

  async clearCart(userId: string) {
    await db.delete(cartItem).where(eq(cartItem.userId, userId));
  },
};
