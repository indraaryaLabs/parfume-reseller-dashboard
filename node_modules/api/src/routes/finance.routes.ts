import { Router } from 'express';
import { financeService } from '../services/finance.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/transactions', requireAuth, requireAdmin, async (req, res) => {
  try {
    const transactions = await financeService.listTransactions({
      type: req.query.type as string,
      month: req.query.month ? Number(req.query.month) : undefined,
      year: req.query.year ? Number(req.query.year) : undefined,
    });
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/transactions', requireAuth, requireAdmin, async (req, res) => {
  try {
    const tx = await financeService.create(req.body);
    res.status(201).json(tx);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/summary', requireAuth, requireAdmin, async (req, res) => {
  try {
    const summary = await financeService.getSummary(
      req.query.month ? Number(req.query.month) : undefined,
      req.query.year ? Number(req.query.year) : undefined
    );
    res.json(summary);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
