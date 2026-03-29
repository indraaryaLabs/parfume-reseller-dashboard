import { Router } from 'express';
import { analyticsService } from '../services/analytics.service.js';
import { orderService } from '../services/order.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/overview', requireAuth, requireAdmin, async (req, res) => {
  try {
    const month = req.query.month ? Number(req.query.month) : new Date().getMonth() + 1;
    const year = req.query.year ? Number(req.query.year) : new Date().getFullYear();
    const overview = await analyticsService.getOverview(month, year);
    res.json(overview);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sales-by-brand', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const data = await analyticsService.getSalesByBrand();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/top-products', requireAuth, requireAdmin, async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const data = await analyticsService.getTopProducts(limit);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/revenue-chart', requireAuth, requireAdmin, async (req, res) => {
  try {
    const year = req.query.year ? Number(req.query.year) : new Date().getFullYear();
    const data = await analyticsService.getRevenueChart(year);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stock-alerts', requireAuth, requireAdmin, async (req, res) => {
  try {
    const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
    const data = await analyticsService.getStockAlerts(threshold);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Dashboard KPIs ───────────────────────────────
router.get('/dashboard/kpis', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const kpis = await analyticsService.getDashboardKpis();
    res.json(kpis);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/dashboard/recent-orders', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const orders = await orderService.getRecentOrders(5);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
