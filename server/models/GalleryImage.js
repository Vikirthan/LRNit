import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('GalleryImage', galleryImageSchema);
