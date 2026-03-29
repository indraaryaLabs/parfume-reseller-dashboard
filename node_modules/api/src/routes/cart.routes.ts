import { Router } from 'express';
import { cartService } from '../services/cart.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const items = await cartService.getByUser(req.user!.id);
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await cartService.addItem(req.user!.id, req.body.productId, req.body.quantity);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:itemId', requireAuth, async (req, res) => {
  try {
    const item = await cartService.updateQuantity(req.params.itemId as string, req.body.quantity);
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:itemId', requireAuth, async (req, res) => {
  try {
    await cartService.removeItem(req.params.itemId as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', requireAuth, async (req, res) => {
  try {
    await cartService.clearCart(req.user!.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
