import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const submitSchema = z.object({
  type: z.enum(['technical', 'soft', 'aptitude']),
  score: z.number().min(0).max(100),
  correct: z.number().int(),
  total: z.number().int(),
  answers: z.any().optional(),
});

router.get('/', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const assessments = await prisma.assessment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(assessments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

router.post('/submit', authenticate, async (req, res) => {
  try {
    const data = submitSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const assessment = await prisma.assessment.create({
      data: { userId: req.user.id, ...data },
    });
    res.status(201).json(assessment);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
});

export default router;
