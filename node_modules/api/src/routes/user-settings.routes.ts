import { Router } from 'express';
import { userSettingsService } from '../services/user-settings.service.js';
import { requireAuth } from '../middleware/auth.js';
import { auth } from '../auth/index.js';
import { fromNodeHeaders } from 'better-auth/node';

const router = Router();

// All routes require auth
router.use(requireAuth);

// ── Profile ──────────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const profile = await userSettingsService.getProfile(req.user!.id);
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const profile = await userSettingsService.upsertProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Password ─────────────────────────────────────
router.put('/password', async (req, res) => {
  try {
    await auth.api.changePassword({
      headers: fromNodeHeaders(req.headers),
      body: {
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
      },
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ── Notifications ────────────────────────────────
router.get('/notifications', async (req, res) => {
  try {
    const prefs = await userSettingsService.getNotificationPrefs(req.user!.id);
    res.json(prefs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/notifications', async (req, res) => {
  try {
    const prefs = await userSettingsService.upsertNotificationPrefs(req.user!.id, req.body);
    res.json(prefs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Sessions ─────────────────────────────────────
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await auth.api.listSessions({
      headers: fromNodeHeaders(req.headers),
    });
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/sessions/:token', async (req, res) => {
  try {
    await auth.api.revokeSession({
      headers: fromNodeHeaders(req.headers),
      body: { token: req.params.token as string },
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/sessions', async (req, res) => {
  try {
    await auth.api.revokeSessions({
      headers: fromNodeHeaders(req.headers),
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
