import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/me', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, avatar: true, dept: true, university: true, company: true, year: true, cgpa: true, phone: true, bio: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/me/skills', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const skills = await prisma.userSkill.findMany({ where: { userId: req.user.id } });
    res.json(skills);
  } catch {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

router.put('/me', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const { name, dept, university, company, year, cgpa, phone, bio, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, dept, university, company, year, cgpa, phone, bio, avatar },
      select: { id: true, name: true, email: true, role: true, avatar: true, dept: true, university: true, company: true },
    });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.post('/me/skills', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const { skillName, score, category, level } = req.body;
    const skill = await prisma.userSkill.upsert({
      where: { userId_skillName: { userId: req.user.id, skillName } },
      update: { score, category, level },
      create: { userId: req.user.id, skillName, score, category, level },
    });
    res.json(skill);
  } catch {
    res.status(500).json({ error: 'Failed to save skill' });
  }
});

export default router;
