import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, ChevronDown } from 'lucide-react';
import { supabase } from '../supabaseClient';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
};

export default function Team() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback temporary data while backend is disconnected
    const fallbackData = [
        { id: '1', name: 'Vikirthan T', role: 'Chief Executive Officer', team_name: 'Executive', photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', isCeo: true },
        { id: '2', name: 'Alice Smith', role: 'Lead Developer', team_name: 'Tech Team', photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
        { id: '3', name: 'Bob Johnson', role: 'Marketing Head', team_name: 'Marketing Team', photo_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80' },
        { id: '4', name: 'Charlie Brown', role: 'PR Manager', team_name: 'PR Team', photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { id: '5', name: 'David Lee', role: 'Event Coordinator', team_name: 'Event Planning & Management', photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    ];

    const TEAMS_CONFIG = [
        { name: 'Tech Team', desc: 'Building software solutions and technical infrastructure (like this site!).', slogan: 'Architecting the digital foundation.' },
        { name: 'Website Enthusiasts', desc: 'Passionate about modern web development and design.', slogan: 'Crafting pixel-perfect experiences.' },
        { name: 'Event Planning & Management', desc: 'Orchestrating seamless workshops and flagship events.', slogan: 'Bringing ideas to life.' },
        { name: 'Media Team', desc: 'Capturing moments and creating visual narratives.', slogan: 'Telling stories through lenses.' },
        { name: 'Marketing Team', desc: 'Spreading the word and driving organic growth.', slogan: 'Amplifying our voice.' },
        { name: 'PR Team', desc: 'Managing public relations and external communication.', slogan: 'Building meaningful relationships.' },
        { name: 'Sponsorship Team', desc: 'Securing partnerships and funding for large-scale events.', slogan: 'Fueling our ambitions.' },
        { name: 'HR Team', desc: 'Fostering member engagement and internal culture.', slogan: 'Empowering our people.' }
    ];

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { data, error } = await supabase
                    .from('team')
                    .select('*')
                    .order('display_order', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {
                    setMembers(data);
                } else {
                    setMembers(fallbackData);
                }
            } catch (err) {
                console.warn("Supabase error fetching team. Using fallback data.");
                setMembers(fallbackData);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    const ceo = members.find(m => m.isCeo || m.role?.toLowerCase() === 'ceo' || m.role?.toLowerCase().includes('chief executive')) || fallbackData[0];
    const totalMembers = 30; // Hardcoded requirement for now

    // Helper to group members by team
    const getMembersByTeam = (teamName) => {
        return members.filter(m => m.team_name === teamName && m.id !== ceo.id);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading team...</div>;

    return (
        <div className="w-full bg-lightTechBackground min-h-screen pb-24">
            {/* Header */}
            <section className="pt-32 pb-16 bg-deepCircuitBlue text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primaryTechBlue blur-[120px] rounded-full opacity-30"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6"
                    >
                        <Users className="h-4 w-4 text-innovationPurple" />
                        <span className="text-sm font-medium tracking-wide">TOTAL STRENGTH: {totalMembers} MEMBERS</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold mb-6 text-white"
                    >
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryTechBlue to-innovationPurple">Minds</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/80 max-w-2xl mx-auto"
                    >
                        The passionate students driving LRNit’s mission forward.
                    </motion.p>
                </div>
            </section>

            {/* CEO Highlight Section */}
            {ceo && (
                <section className="py-20 -mt-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="glassmorphism rounded-3xl p-8 md:p-12 relative shadow-2xl overflow-hidden border border-primaryTechBlue/20"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primaryTechBlue/10 to-innovationPurple/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="shrink-0 relative">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                                        <img
                                            src={ceo.photo_url || '/placeholder-user.jpg'}
                                            alt={ceo.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full shadow-lg z-20 text-white">
                                        <Crown className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="text-center md:text-left flex-grow pt-4">
                                    <h3 className="text-sm font-bold tracking-widest text-primaryTechBlue uppercase mb-1">Chief Executive Officer</h3>
                                    <h2 className="text-4xl font-display font-bold text-deepCircuitBlue mb-4">{ceo.name}</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed italic">
                                        "Driving the vision of 'Learn. Build. Lead.' ensuring every student has the platform to discover their ultimate potential."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Teams Grid Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TEAMS_CONFIG.map((teamConfig, idx) => {
                            const teamMembers = getMembersByTeam(teamConfig.name);

                            return (
                                <motion.div
                                    key={idx}
                                    {...fadeIn}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
                                >
                                    {/* Card Header */}
                                    <div className="p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primaryTechBlue/5 rounded-full blur-2xl group-hover:bg-primaryTechBlue/10 transition-colors pointer-events-none"></div>
                                        <h3 className="text-2xl font-display font-bold text-deepCircuitBlue mb-2 relative z-10">{teamConfig.name}</h3>
                                        <p className="text-sm text-gray-500 relative z-10">{teamConfig.desc}</p>
                                    </div>

                                    {/* Card Body - Members List */}
                                    <div className="p-6 flex-grow bg-white">
                                        {teamMembers.length > 0 ? (
                                            <div className="space-y-4">
                                                {teamMembers.map((member) => (
                                                    <div key={member.id} className="flex items-center space-x-4 p-2 rounded-xl hover:bg-lightTechBackground transition-colors">
                                                        <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100 shrink-0">
                                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                                                            <p className="text-xs text-gray-500">{member.role}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8">
                                                <Users className="h-8 w-8 mb-2 opacity-50" />
                                                <p className="text-sm">{teamConfig.slogan || 'Recruiting outstanding individuals.'}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
}
