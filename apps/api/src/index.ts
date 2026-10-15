import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Route imports
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import reviewRoutes from './routes/review.routes.js';
import addressRoutes from './routes/address.routes.js';
import promoRoutes from './routes/promo.routes.js';
import financeRoutes from './routes/finance.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import adminSettingsRoutes from './routes/admin-settings.routes.js';
import userSettingsRoutes from './routes/user-settings.routes.js';
import { requireAuth } from './middleware/auth.js';
import { db } from './db/index.js';
import { userProfile } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
    ],
    credentials: true,
  })
);
app.use(express.json());

// ── Health Check ─────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Current User endpoint ────────────────────────
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const profile = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, req.user!.id),
    });
    res.json({
      user: req.user,
      role: profile?.role || 'customer',
    });
  } catch {
    res.json({ user: req.user, role: 'customer' });
  }
});

// ── Routes ───────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', reviewRoutes); // mounted at /api since routes include /products/:id/reviews
app.use('/api/addresses', addressRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/admin/finance', financeRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/settings', userSettingsRoutes);

// ── Start Server ─────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Parfumé API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
