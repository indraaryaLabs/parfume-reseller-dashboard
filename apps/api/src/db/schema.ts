import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  date,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// ─── Enums ───────────────────────────────────────────────
export const userRoleEnum = pgEnum('user_role', ['customer', 'admin']);
export const productStatusEnum = pgEnum('product_status', ['READY STOCK', 'RESTOCKING', 'SOLD OUT']);
export const orderStatusEnum = pgEnum('order_status', ['BARU', 'DIPROSES', 'DIKIRIM', 'SELESAI']);
export const transactionTypeEnum = pgEnum('transaction_type', ['INCOME', 'EXPENSE']);
export const promoTypeEnum = pgEnum('promo_type', ['PERCENTAGE', 'FIXED', 'FREE_SHIPPING']);

// ─── Better Auth core tables ─────────────────────────────
// These are auto-managed by Better Auth, defined here so Drizzle is aware
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ─── User Profile (extends Better Auth user) ─────────────
export const userProfile = pgTable('user_profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  fullName: varchar('full_name', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  dateOfBirth: date('date_of_birth'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  role: userRoleEnum('role').default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Products ────────────────────────────────────────────
export const product = pgTable('product', {
  id: uuid('id').defaultRandom().primaryKey(),
  brand: varchar('brand', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  oldPrice: integer('old_price'),
  costPrice: integer('cost_price'),
  stock: integer('stock').default(0).notNull(),
  status: productStatusEnum('status').default('READY STOCK').notNull(),
  category: varchar('category', { length: 50 }),
  longevity: integer('longevity'),
  projection: integer('projection'),
  topNotes: varchar('top_notes', { length: 255 }),
  midNotes: varchar('mid_notes', { length: 255 }),
  baseNotes: varchar('base_notes', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productImage = pgTable('product_image', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Addresses ───────────────────────────────────────────
export const address = pgTable('address', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  label: varchar('label', { length: 50 }),
  recipientName: varchar('recipient_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  street: text('street').notNull(),
  city: varchar('city', { length: 100 }),
  zipCode: varchar('zip_code', { length: 10 }),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Cart ────────────────────────────────────────────────
export const cartItem = pgTable(
  'cart_item',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => product.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').default(1).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('cart_user_product_idx').on(table.userId, table.productId)]
);

// ─── Orders ──────────────────────────────────────────────
export const order = pgTable('order', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: varchar('order_number', { length: 30 }).notNull().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: orderStatusEnum('status').default('BARU').notNull(),
  addressId: uuid('address_id').references(() => address.id),
  shippingMethod: varchar('shipping_method', { length: 50 }),
  shippingCost: integer('shipping_cost').default(0).notNull(),
  paymentMethod: varchar('payment_method', { length: 20 }),
  trackingNumber: varchar('tracking_number', { length: 50 }),
  subtotal: integer('subtotal').notNull(),
  total: integer('total').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItem = pgTable('order_item', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => order.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => product.id),
  name: varchar('name', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 100 }).notNull(),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderEvent = pgTable('order_event', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => order.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull(),
  description: text('description'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Reviews ─────────────────────────────────────────────
export const review = pgTable('review', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Financial Transactions ──────────────────────────────
export const transaction = pgTable('transaction', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description'),
  amount: integer('amount').notNull(),
  date: date('date').notNull(),
  orderId: uuid('order_id').references(() => order.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Promotions ──────────────────────────────────────────
export const promo = pgTable('promo', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  type: promoTypeEnum('type').notNull(),
  value: integer('value').default(0).notNull(),
  minPurchase: integer('min_purchase'),
  imageUrl: text('image_url'),
  productId: uuid('product_id').references(() => product.id),
  isActive: boolean('is_active').default(true).notNull(),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Store Settings (single-row config) ──────────────────
export const storeSettings = pgTable('store_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  storeName: varchar('store_name', { length: 255 }),
  description: text('description'),
  address: text('address'),
  logoUrl: text('logo_url'),
  bannerUrl: text('banner_url'),
  whatsapp: varchar('whatsapp', { length: 20 }),
  instagram: varchar('instagram', { length: 100 }),
  email: varchar('email', { length: 255 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Payment Methods ─────────────────────────────────────
export const paymentMethod = pgTable('payment_method', {
  id: uuid('id').defaultRandom().primaryKey(),
  bankName: varchar('bank_name', { length: 100 }).notNull(),
  accountName: varchar('account_name', { length: 255 }).notNull(),
  accountNumber: varchar('account_number', { length: 50 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── QRIS Config ─────────────────────────────────────────
export const qrisConfig = pgTable('qris_config', {
  id: uuid('id').defaultRandom().primaryKey(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Shipping Methods ────────────────────────────────────
export const shippingMethod = pgTable('shipping_method', {
  id: uuid('id').defaultRandom().primaryKey(),
  courierName: varchar('courier_name', { length: 100 }).notNull(),
  serviceName: varchar('service_name', { length: 100 }).notNull(),
  estimatedDays: varchar('estimated_days', { length: 50 }),
  cost: integer('cost').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Shipping Settings ───────────────────────────────────
export const shippingSettings = pgTable('shipping_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  pickupAddress: text('pickup_address'),
  pickupCity: varchar('pickup_city', { length: 100 }),
  pickupZipCode: varchar('pickup_zip_code', { length: 10 }),
  freeShippingEnabled: boolean('free_shipping_enabled').default(false).notNull(),
  freeShippingMin: integer('free_shipping_min'),
  freeShippingMax: integer('free_shipping_max'),
  defaultPacking: varchar('default_packing', { length: 50 }),
  codEnabled: boolean('cod_enabled').default(false).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Notification Preferences ────────────────────────────
export const notificationPreference = pgTable('notification_preference', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  orderUpdates: boolean('order_updates').default(true).notNull(),
  promotions: boolean('promotions').default(true).notNull(),
  newsletter: boolean('newsletter').default(false).notNull(),
  smsEnabled: boolean('sms_enabled').default(false).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
