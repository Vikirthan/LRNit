import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    team: { type: String, enum: ['Core', 'Technical', 'Design', 'Marketing', 'Events', 'Content'], default: 'Core' },
    photoUrl: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
