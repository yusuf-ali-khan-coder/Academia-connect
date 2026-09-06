import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const challengeSchema = z.object({
  title: z.string().min(3),
  type: z.string(),
  description: z.string().min(10),
  prize: z.string(),
  deadline: z.string().datetime(),
  teamSize: z.number().int().positive(),
  skills: z.array(z.string()),
});

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const challenges = await prisma.challenge.findMany({ orderBy: { deadline: 'asc' } });
    res.json(challenges);
  } catch {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const data = challengeSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const challenge = await prisma.challenge.create({
      data: { ...data, creatorId: req.user.id },
    });
    res.status(201).json(challenge);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to create challenge' });
  }
});

router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const existing = await prisma.challengeRegistration.findUnique({
      where: { challengeId_userId: { challengeId: req.params.id, userId: req.user.id } },
    });
    if (existing) return res.status(409).json({ error: 'Already registered' });
    await prisma.challengeRegistration.create({
      data: { challengeId: req.params.id, userId: req.user.id, teamName: req.body.teamName },
    });
    await prisma.challenge.update({ where: { id: req.params.id }, data: { registered: { increment: 1 } } });
    res.json({ message: 'Registered' });
  } catch {
    res.status(500).json({ error: 'Failed to register' });
  }
});

export default router;
