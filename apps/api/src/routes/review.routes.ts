import { Router } from 'express';
import { reviewService } from '../services/review.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const reviews = await reviewService.listByProduct(req.params.productId as string);
    const stats = await reviewService.getAverageRating(req.params.productId as string);
    res.json({ reviews, ...stats });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/products/:productId/reviews', requireAuth, async (req, res) => {
  try {
    const review = await reviewService.create({
      productId: req.params.productId as string,
      userId: req.user!.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(201).json(review);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
