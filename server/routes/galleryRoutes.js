import express from 'express';
import GalleryImage from '../models/GalleryImage.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/gallery - Public
router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/gallery - Protected
router.post('/', auth, async (req, res) => {
    try {
        const image = new GalleryImage(req.body);
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/gallery/:id - Protected
router.delete('/:id', auth, async (req, res) => {
    try {
        const image = await GalleryImage.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found.' });
        res.json({ message: 'Image deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
