import { Router } from 'express';
import { adminSettingsService } from '../services/admin-settings.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

// All routes require admin
router.use(requireAuth, requireAdmin);

// ── Store ────────────────────────────────────────
router.get('/store', async (_req, res) => {
  try {
    const store = await adminSettingsService.getStore();
    res.json(store);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/store', async (req, res) => {
  try {
    const store = await adminSettingsService.updateStore(req.body);
    res.json(store);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Payment Methods ──────────────────────────────
router.get('/payment-methods', async (_req, res) => {
  try {
    const methods = await adminSettingsService.listPaymentMethods();
    res.json(methods);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/payment-methods', async (req, res) => {
  try {
    const method = await adminSettingsService.createPaymentMethod(req.body);
    res.status(201).json(method);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/payment-methods/:id', async (req, res) => {
  try {
    const method = await adminSettingsService.updatePaymentMethod(req.params.id, req.body);
    res.json(method);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/payment-methods/:id', async (req, res) => {
  try {
    await adminSettingsService.deletePaymentMethod(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── QRIS ─────────────────────────────────────────
router.get('/qris', async (_req, res) => {
  try {
    const qris = await adminSettingsService.getQris();
    res.json(qris);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/qris', async (req, res) => {
  try {
    const qris = await adminSettingsService.updateQris(req.body);
    res.json(qris);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Shipping ─────────────────────────────────────
router.get('/shipping', async (_req, res) => {
  try {
    const [settings, methods] = await Promise.all([
      adminSettingsService.getShippingSettings(),
      adminSettingsService.listShippingMethods(),
    ]);
    res.json({ settings, methods });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/shipping', async (req, res) => {
  try {
    const settings = await adminSettingsService.updateShippingSettings(req.body);
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/shipping-methods', async (_req, res) => {
  try {
    const methods = await adminSettingsService.listShippingMethods();
    res.json(methods);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/shipping-methods', async (req, res) => {
  try {
    const method = await adminSettingsService.createShippingMethod(req.body);
    res.status(201).json(method);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/shipping-methods/:id', async (req, res) => {
  try {
    const method = await adminSettingsService.updateShippingMethod(req.params.id, req.body);
    res.json(method);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/shipping-methods/:id', async (req, res) => {
  try {
    await adminSettingsService.deleteShippingMethod(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
