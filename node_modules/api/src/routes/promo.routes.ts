import { Router } from 'express';
import { promoService } from '../services/promo.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

// ── Public ───────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const promos = await promoService.listActive();
    res.json(promos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const promo = await promoService.getById(req.params.id as string);
    if (!promo) {
      res.status(404).json({ error: 'Promo not found' });
      return;
    }
    res.json(promo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Admin ────────────────────────────────────────
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const promo = await promoService.create(req.body);
    res.status(201).json(promo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const promo = await promoService.update(req.params.id as string, req.body);
    if (!promo) {
      res.status(404).json({ error: 'Promo not found' });
      return;
    }
    res.json(promo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await promoService.delete(req.params.id as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
