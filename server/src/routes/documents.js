import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const docs = await prisma.document.findMany({
      where: { userId: req.user.id },
      orderBy: { uploadedAt: 'desc' },
    });
    res.json(docs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const prisma = req.app.get('prisma');
    const doc = await prisma.document.create({
      data: {
        userId: req.user.id,
        name: req.body.name || req.file.originalname,
        type: req.body.type || 'other',
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
    res.status(201).json(doc);
  } catch {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const prisma = req.app.get('prisma');
    const doc = await prisma.document.findUnique({ where: { id: req.params.id } });
    if (!doc || doc.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
    await prisma.document.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
