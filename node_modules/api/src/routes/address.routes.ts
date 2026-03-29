import { Router } from 'express';
import { addressService } from '../services/address.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const addresses = await addressService.listByUser(req.user!.id);
    res.json(addresses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const address = await addressService.create(req.user!.id, req.body);
    res.status(201).json(address);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const address = await addressService.update(req.params.id as string, req.user!.id, req.body);
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.json(address);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await addressService.delete(req.params.id as string, req.user!.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/primary', requireAuth, async (req, res) => {
  try {
    const address = await addressService.setPrimary(req.params.id as string, req.user!.id);
    res.json(address);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
