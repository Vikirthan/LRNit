import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackData = [
        { _id: '1', title: 'Welcome to LRNit!', content: 'We are thrilled to launch our new portal. Stay tuned for exciting technical workshops and hackathons coming this semester!', date: new Date().toISOString(), priority: 'High' },
        { _id: '2', title: 'Cyber Security Workshop Details', content: 'The venue for the upcoming Cyber Security Workshop has been shifted to Block 32, Room 402. Please carry your laptops and have Wireshark installed.', date: new Date(Date.now() - 86400000).toISOString(), priority: 'Normal' },
        { _id: '3', title: 'Call for Core Team Members', content: 'We are recruiting designers, web developers, and event coordinators. Fill out the form in your student email before next Friday to apply!', date: new Date(Date.now() - 172800000).toISOString(), priority: 'Low' },
    ];

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get(`${API_URL}/announcements`);
                setAnnouncements(res.data);
            } catch (err) {
                console.warn("Backend not connected yet. Using fallback data for announcements.");
                setAnnouncements(fallbackData);
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-50 text-red-600 border-red-200';
            case 'Normal': return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'Low': return 'bg-gray-50 text-gray-600 border-gray-200';
            default: return 'bg-gray-50 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="w-full bg-lightTechBackground min-h-screen pb-24">
            {/* Header */}
            <section className="pt-32 pb-16 bg-white border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full circuit-pattern opacity-10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 bg-primaryTechBlue/10 px-4 py-2 rounded-full mb-6"
                    >
                        <Megaphone className="h-4 w-4 text-primaryTechBlue" />
                        <span className="text-sm font-medium tracking-wide text-primaryTechBlue uppercase">Stay Informed</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-deepCircuitBlue mb-6"
                    >
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryTechBlue to-innovationPurple">Announcements</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Important updates, notices, and news from the LRNit community.
                    </motion.p>
                </div>
            </section>

            {/* List */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryTechBlue"></div>
                        </div>
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="space-y-6"
                        >
                            {announcements.map((announcement) => (
                                <motion.div
                                    variants={fadeUp}
                                    key={announcement._id}
                                    className={`bg-white rounded-2xl border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 p-6 md:p-8 ${announcement.priority === 'High' ? 'border-l-red-500' :
                                        announcement.priority === 'Normal' ? 'border-l-primaryTechBlue' :
                                            'border-l-gray-400'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                {announcement.priority === 'High' && (
                                                    <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                                        <AlertCircle className="h-3 w-3 mr-1" /> Urgent
                                                    </span>
                                                )}
                                                <h3 className="text-2xl font-display font-bold text-deepCircuitBlue">
                                                    {announcement.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                                {announcement.content}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                                        <div className="flex items-center text-gray-500 font-medium">
                                            <Clock className="h-4 w-4 mr-2 text-primaryTechBlue" />
                                            {new Date(announcement.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <div className={`px-3 py-1 rounded-md border text-xs font-bold tracking-wider uppercase ${getPriorityColor(announcement.priority)}`}>
                                            {announcement.priority} Priority
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {!loading && announcements.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Megaphone className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg">No new announcements at this time.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
