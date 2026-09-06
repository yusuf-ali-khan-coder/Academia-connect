import { Router } from 'express';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

const oppSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['internship', 'job', 'apprenticeship', 'project']),
  company: z.string().min(2),
  location: z.string().min(2),
  duration: z.string(),
  stipend: z.string(),
  skills: z.array(z.string()).min(1),
  requirements: z.string().optional(),
  description: z.string().min(10),
  deadline: z.string().datetime(),
  spots: z.number().int().positive(),
});

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const { type, search } = req.query;
    const where = {};
    if (type && type !== 'all') where.type = type;
    if (search) where.OR = [{ title: { contains: search, mode: 'insensitive' } }, { company: { contains: search, mode: 'insensitive' } }];
    const opportunities = await prisma.opportunity.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(opportunities);
  } catch {
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const opp = await prisma.opportunity.findUnique({ where: { id: req.params.id } });
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
    res.json(opp);
  } catch {
    res.status(500).json({ error: 'Failed to fetch opportunity' });
  }
});

router.post('/', authenticate, authorize('industry', 'institution'), async (req, res) => {
  try {
    const data = oppSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const opp = await prisma.opportunity.create({
      data: { ...data, creatorId: req.user.id, company: req.user.company || data.company },
    });
    res.status(201).json(opp);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to create opportunity' });
  }
});

router.put('/:id', authenticate, authorize('industry', 'institution'), async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const opp = await prisma.opportunity.findUnique({ where: { id: req.params.id } });
    if (!opp) return res.status(404).json({ error: 'Not found' });
    if (opp.creatorId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    const updated = await prisma.opportunity.update({ where: { id: req.params.id }, data: req.body });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update opportunity' });
  }
});

router.delete('/:id', authenticate, authorize('industry', 'institution'), async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const opp = await prisma.opportunity.findUnique({ where: { id: req.params.id } });
    if (!opp) return res.status(404).json({ error: 'Not found' });
    if (opp.creatorId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    await prisma.opportunity.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
});

export default router;
