import type { Request, Response, NextFunction } from 'express';
import { db } from '../db/index.js';
import { userProfile } from '../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Middleware that requires admin role.
 * Must be used AFTER requireAuth middleware.
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const profile = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, req.user.id),
    });

    if (!profile || profile.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    next();
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
