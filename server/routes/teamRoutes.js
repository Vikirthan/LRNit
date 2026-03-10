import express from 'express';
import TeamMember from '../models/TeamMember.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/team - Public
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ displayOrder: 1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/team - Protected
router.post('/', auth, async (req, res) => {
    try {
        const member = new TeamMember(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/team/:id - Protected
router.put('/:id', auth, async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!member) return res.status(404).json({ message: 'Team member not found.' });
        res.json(member);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/team/:id - Protected
router.delete('/:id', auth, async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ message: 'Team member not found.' });
        res.json({ message: 'Team member deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
