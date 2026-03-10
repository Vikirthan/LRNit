import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import AdminUser from './models/AdminUser.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lrnit';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await AdminUser.findOne({ username: 'admin' });
        if (existing) {
            console.log('Admin user already exists. Skipping seed.');
        } else {
            const hashedPassword = await bcrypt.hash('lrnit2026', 10);
            await AdminUser.create({ username: 'admin', password: hashedPassword });
            console.log('✅ Admin user created: username="admin", password="lrnit2026"');
        }

        await mongoose.disconnect();
        console.log('Done.');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
