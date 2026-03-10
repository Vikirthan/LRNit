import express from 'express';
import Event from '../models/Event.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/events - Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/events/:id - Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found.' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/events - Protected
router.post('/', auth, async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/events/:id - Protected
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) return res.status(404).json({ message: 'Event not found.' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/events/:id - Protected
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found.' });
        res.json({ message: 'Event deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
