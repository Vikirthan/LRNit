import express from 'express';
import Announcement from '../models/Announcement.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all announcements (public)
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create announcement (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newAnnouncement = new Announcement(req.body);
        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update announcement (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAnnouncement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete announcement (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
