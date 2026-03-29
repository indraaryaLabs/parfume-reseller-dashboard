import { Router } from 'express';
import { productService } from '../services/product.service.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

// ── Public ───────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filters = {
      brand: req.query.brand as string,
      category: req.query.category as string,
      status: req.query.status as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      search: req.query.search as string,
      sort: req.query.sort as string,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };
    const result = await productService.list(filters);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getById(req.params.id as string);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Admin ────────────────────────────────────────
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await productService.update(req.params.id as string, req.body);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await productService.delete(req.params.id as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/images', requireAuth, requireAdmin, async (req, res) => {
  try {
    const image = await productService.addImage(req.params.id as string, req.body.url, req.body.sortOrder);
    res.status(201).json(image);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id/images/:imageId', requireAuth, requireAdmin, async (req, res) => {
  try {
    await productService.deleteImage(req.params.imageId as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/bulk-status', requireAuth, requireAdmin, async (req, res) => {
  try {
    await productService.bulkUpdateStatus(req.body.ids, req.body.status);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/bulk', requireAuth, requireAdmin, async (req, res) => {
  try {
    await productService.bulkDelete(req.body.ids);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
