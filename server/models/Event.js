import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Technical', 'Non-Technical', 'Workshop', 'Cultural'], default: 'Technical' },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Upcoming', 'Live', 'Past'], default: 'Upcoming' },
    imageUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    bannerColor: { type: String, default: '#0B3D91' },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
