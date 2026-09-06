import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const programSchema = z.object({
  title: z.string().min(3),
  company: z.string(),
  type: z.enum(['certification', 'training', 'workshop', 'mentorship']),
  duration: z.string(),
  mode: z.string(),
  skills: z.array(z.string()),
  price: z.string(),
  description: z.string().min(10),
  deadline: z.string().datetime(),
  instructor: z.string().optional(),
});

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const programs = await prisma.learningProgram.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(programs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const data = programSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const program = await prisma.learningProgram.create({
      data: { ...data, creatorId: req.user.id },
    });
    res.status(201).json(program);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to create program' });
  }
});

export default router;
