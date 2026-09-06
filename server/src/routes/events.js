import { Router } from 'express';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

const eventSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['lecture', 'workshop', 'mentorship', 'project', 'challenge']),
  description: z.string().min(10),
  date: z.string().datetime(),
  time: z.string(),
  mode: z.enum(['online', 'hybrid', 'oncampus']),
  speaker: z.string().optional(),
  capacity: z.number().int().positive(),
});

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const events = await prisma.collabEvent.findMany({ orderBy: { date: 'asc' } });
    res.json(events);
  } catch {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const data = eventSchema.parse(req.body);
    const prisma = req.app.get('prisma');
    const event = await prisma.collabEvent.create({
      data: { ...data, hostId: req.user.id },
    });
    res.status(201).json(event);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: e.errors });
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const event = await prisma.collabEvent.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.registered >= event.capacity) return res.status(400).json({ error: 'Event is full' });
    const existing = await prisma.eventRegistration.findUnique({
      where: { eventId_userId: { eventId: req.params.id, userId: req.user.id } },
    });
    if (existing) return res.status(409).json({ error: 'Already registered' });
    await prisma.eventRegistration.create({
      data: { eventId: req.params.id, userId: req.user.id },
    });
    await prisma.collabEvent.update({
      where: { id: req.params.id },
      data: { registered: { increment: 1 } },
    });
    res.json({ message: 'Registered' });
  } catch {
    res.status(500).json({ error: 'Failed to register' });
  }
});

export default router;
