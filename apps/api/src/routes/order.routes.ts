import { Router } from 'express';
import { orderService } from '../services/order.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

// ── Customer ─────────────────────────────────────
router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await orderService.listByUser(req.user!.id, req.query.status as string);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id as string);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const order = await orderService.createFromCart(req.user!.id, req.body);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ── Admin ────────────────────────────────────────
router.get('/admin/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const orders = await orderService.listAll(req.query.status as string);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id as string);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/admin/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const order = await orderService.updateStatus(
      req.params.id as string,
      req.body.status,
      req.body.trackingNumber
    );
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
