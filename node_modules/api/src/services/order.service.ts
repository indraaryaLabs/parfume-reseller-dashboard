import { db } from '../db/index.js';
import { order, orderItem, orderEvent, cartItem, product, transaction, productImage } from '../db/schema.js';
import { eq, desc, and, sql } from 'drizzle-orm';

export const orderService = {
  async listByUser(userId: string, status?: string) {
    const conditions = [eq(order.userId, userId)];
    if (status) conditions.push(eq(order.status, status as any));

    const orders = await db
      .select()
      .from(order)
      .where(and(...conditions))
      .orderBy(desc(order.createdAt));

    return orders;
  },

  async listAll(status?: string) {
    const conditions = [];
    if (status) conditions.push(eq(order.status, status as any));

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    return db.select().from(order).where(where).orderBy(desc(order.createdAt));
  },

  async getById(id: string) {
    const o = await db.query.order.findFirst({ where: eq(order.id, id) });
    if (!o) return null;

    const items = await db.select().from(orderItem).where(eq(orderItem.orderId, id));
    const events = await db
      .select()
      .from(orderEvent)
      .where(eq(orderEvent.orderId, id))
      .orderBy(desc(orderEvent.timestamp));

    return { ...o, items, events };
  },

  async createFromCart(
    userId: string,
    data: { addressId: string; shippingMethod: string; shippingCost: number; paymentMethod: string }
  ) {
    // Get cart items with product details
    const items = await db
      .select()
      .from(cartItem)
      .where(eq(cartItem.userId, userId))
      .innerJoin(product, eq(cartItem.productId, product.id));

    if (items.length === 0) throw new Error('Cart is empty');

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.cart_item.quantity, 0);
    const total = subtotal + data.shippingCost;

    // Generate order number
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(order);
    const seqNum = String(Number(countResult[0]?.count ?? 0) + 1).padStart(3, '0');
    const orderNumber = `ORD-${dateStr}-${seqNum}`;

    // Create order
    const [newOrder] = await db
      .insert(order)
      .values({
        orderNumber,
        userId,
        status: 'BARU',
        addressId: data.addressId,
        shippingMethod: data.shippingMethod,
        shippingCost: data.shippingCost,
        paymentMethod: data.paymentMethod,
        subtotal,
        total,
      })
      .returning();

    // Create order items (product snapshots)
    for (const item of items) {
      // Get first image
      const images = await db
        .select()
        .from(productImage)
        .where(eq(productImage.productId, item.product.id))
        .limit(1);

      await db.insert(orderItem).values({
        orderId: newOrder.id,
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.cart_item.quantity,
        imageUrl: images[0]?.url ?? null,
      });

      // Reduce stock
      await db
        .update(product)
        .set({ stock: sql`${product.stock} - ${item.cart_item.quantity}` })
        .where(eq(product.id, item.product.id));
    }

    // Create initial order event
    await db.insert(orderEvent).values({
      orderId: newOrder.id,
      status: 'Order Created',
      description: 'Pesanan dibuat, menunggu verifikasi pembayaran',
    });

    // Clear cart
    await db.delete(cartItem).where(eq(cartItem.userId, userId));

    return newOrder;
  },

  async updateStatus(id: string, newStatus: string, trackingNumber?: string) {
    const updateData: any = { status: newStatus, updatedAt: new Date() };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;

    const [updated] = await db.update(order).set(updateData).where(eq(order.id, id)).returning();

    // Create timeline event
    const statusMap: Record<string, string> = {
      BARU: 'Order Created',
      DIPROSES: 'Payment Confirmed',
      DIKIRIM: 'Shipped',
      SELESAI: 'Delivered',
    };

    const descMap: Record<string, string> = {
      BARU: 'Pesanan dibuat, menunggu verifikasi pembayaran',
      DIPROSES: 'Pembayaran berhasil diverifikasi',
      DIKIRIM: 'Pesanan sedang dalam perjalanan',
      SELESAI: 'Pesanan sampai di tujuan',
    };

    await db.insert(orderEvent).values({
      orderId: id,
      status: statusMap[newStatus] || newStatus,
      description: descMap[newStatus] || '',
    });

    // Auto-create income transaction when order is verified (DIPROSES)
    if (newStatus === 'DIPROSES' && updated) {
      await db.insert(transaction).values({
        type: 'INCOME',
        category: 'Penjualan',
        description: `Order ${updated.orderNumber}`,
        amount: updated.total,
        date: new Date().toISOString().slice(0, 10),
        orderId: id,
      });
    }

    return updated;
  },

  async getRecentOrders(limit: number = 5) {
    return db.select().from(order).orderBy(desc(order.createdAt)).limit(limit);
  },
};
