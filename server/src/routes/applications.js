import { Router } from 'express';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

const appSchema = z.object({
  opportunityId: z.string(),
  coverLetter: z.string().optional(),
});

router.get('/', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const where = req.user.role === 'student' ? { studentId: req.user.id } : {};
    const apps = await prisma.application.findMany({
      where,
      include: { opportunity: true, student: { select: { id: true, name: true, email: true, avatar: true } } },
      orderBy: { appliedAt: 'desc' },
    });
    res.json(apps);
  } catch {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.post('/', authenticate, authorize('student'), async (req, res) => {
  try {
    const data = appSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const existing = await prisma.application.findUnique({
      where: { studentId_opportunityId: { studentId: req.user.id, opportunityId: data.opportunityId } },
    });
    if (existing) return res.status(409).json({ error: 'Already applied' });
    const app = await prisma.application.create({
      data: { studentId: req.user.id, ...data },
      include: { opportunity: true },
    });
    await prisma.opportunity.update({ where: { id: data.opportunityId }, data: { applied: { increment: 1 } } });
    res.status(201).json(app);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to apply' });
  }
});

router.put('/:id/status', authenticate, authorize('industry', 'institution'), async (req, res) => {
  try {
    const { status } = req.body;
    const prisma = req.app.get('prisma');
    const app = await prisma.application.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(app);
  } catch {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

export default router;
