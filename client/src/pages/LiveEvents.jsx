import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CATEGORIES = ['All', 'Technical', 'Non-Technical', 'Workshops', 'Competitions', 'Campus Activities'];

const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LiveEvents() {
    const [events, setEvents] = useState([]);
    const [forms, setForms] = useState({}); // Mapping event_id -> form_id
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Fallback temporary data
    const fallbackData = [
        { id: '1', title: 'Campus Rush 2026', category: 'Campus Activities', date: '2026-04-15T09:00:00.000Z', description: 'Our flagship annual fest featuring a blend of tech and culture.', status: 'Upcoming', is_featured: true, image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', banner_color: '#0B3D91' },
        { id: '2', title: 'Advanced React Workshop', category: 'Workshops', date: '2026-03-20T14:00:00.000Z', description: 'Deep dive into hooks, context, and performance optimization.', status: 'Live', is_featured: false, image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80' },
        { id: '3', title: 'AI Hackathon', category: 'Competitions', date: '2026-03-25T08:00:00.000Z', description: 'Build innovative AI solutions over a 48-hour sprint.', status: 'Upcoming', is_featured: false, image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' },
        { id: '4', title: 'Leadership Seminar', category: 'Non-Technical', date: '2026-02-10T10:00:00.000Z', description: 'Guest lecture by industry leaders on leading tech teams.', status: 'Past', is_featured: false, image_url: 'https://images.unsplash.com/photo-1475721025505-1845bb08a475?auto=format&fit=crop&w=600&q=80' },
        { id: '5', title: 'Web3 & Blockchain Intro', category: 'Technical', date: '2026-04-05T15:00:00.000Z', description: 'Understanding the fundamentals of decentralized web.', status: 'Upcoming', is_featured: false, image_url: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=600&q=80' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [eventRes, formRes] = await Promise.all([
                    supabase.from('events').select('*').order('date', { ascending: false }),
                    supabase.from('forms').select('id, event_id').not('event_id', 'is', null)
                ]);

                if (eventRes.error) throw eventRes.error;

                if (eventRes.data && eventRes.data.length > 0) {
                    setEvents(eventRes.data);
                } else {
                    setEvents(fallbackData);
                }

                if (formRes.data) {
                    const mapping = {};
                    formRes.data.forEach(f => { mapping[f.event_id] = f.id; });
                    setForms(mapping);
                }
            } catch (err) {
                console.warn("Supabase error fetching events. Using fallback data.");
                setEvents(fallbackData);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const featuredEvent = events.find(e => e.is_featured) || (events.length > 0 ? events[0] : fallbackData[0]);
    const filteredEvents = activeCategory === 'All'
        ? (events.length > 0 ? events : fallbackData).filter(e => e.id !== featuredEvent.id)
        : (events.length > 0 ? events : fallbackData).filter(e => e.category === activeCategory && e.id !== featuredEvent.id);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Live': return 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40';
            case 'Upcoming': return 'bg-primaryTechBlue text-white';
            case 'Past': return 'bg-gray-200 text-gray-600';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    const getImagePath = (url) => {
        if (!url) return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
        if (url.startsWith('http')) return url;
        return url;
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
                        <Calendar className="h-4 w-4 text-primaryTechBlue" />
                        <span className="text-sm font-medium tracking-wide text-primaryTechBlue uppercase">Engage & Experience</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-deepCircuitBlue mb-6"
                    >
                        Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryTechBlue to-innovationPurple">Events</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Stay updated with our latest workshops, hackathons, and cultural festivities.
                    </motion.p>
                </div>
            </section>

            {/* Featured Event: Campus Rush */}
            {
                !loading && featuredEvent && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-deepCircuitBlue rounded-3xl overflow-hidden shadow-2xl relative"
                            >
                                <div className="flex flex-col md:flex-row" style={{ backgroundColor: featuredEvent.banner_color || '#0B3D91' }}>
                                    {/* Image Side */}
                                    <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
                                        <img
                                            src={getImagePath(featuredEvent.image_url)}
                                            alt={featuredEvent.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'; }}
                                        />
                                        <div className="absolute inset-0" style={{
                                            background: `linear-gradient(to right, transparent, transparent 50%, ${featuredEvent.banner_color || '#0B3D91'})`
                                        }}></div>

                                        {/* Floating Badges */}
                                        <div className="absolute top-6 left-6 flex space-x-2">
                                            <span className="px-4 py-1.5 bg-innovationPurple text-white text-xs font-bold uppercase rounded-full tracking-wider shadow-lg">
                                                Featured
                                            </span>
                                            <span className={`px-4 py-1.5 text-xs font-bold uppercase rounded-full tracking-wider shadow-lg ${getStatusColor(featuredEvent.status)}`}>
                                                {featuredEvent.status === 'Live' && <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping" />}
                                                {featuredEvent.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center relative z-10 text-white">
                                        <h3 className="text-sm font-bold tracking-widest text-[#a0c5ff] uppercase mb-2">Flagship Event</h3>
                                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">{featuredEvent.title}</h2>
                                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                            {featuredEvent.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                                            <div className="flex items-center text-white/90">
                                                <Calendar className="h-5 w-5 mr-3 text-white" />
                                                <span>{new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                        </div>

                                        {forms[featuredEvent.id] ? (
                                            <Link to={`/register/${forms[featuredEvent.id]}`} className="self-start px-8 py-4 bg-white/20 hover:bg-white hover:text-deepCircuitBlue text-white rounded-xl font-medium transition-colors shadow-lg flex items-center group backdrop-blur-sm border border-white/20">
                                                Register Now <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        ) : (
                                            <button className="self-start px-8 py-4 bg-white/20 hover:bg-gray-400 text-white rounded-xl font-medium transition-colors shadow-lg flex items-center group backdrop-blur-sm border border-white/20 cursor-not-allowed opacity-50">
                                                Registration Closed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )
            }

            {/* Regular Events Filter & Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between mb-8 flex-col md:flex-row">
                        <h3 className="text-2xl font-display font-bold text-deepCircuitBlue mb-4 md:mb-0">Upcoming & Past Events</h3>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                        ? 'bg-primaryTechBlue text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryTechBlue"></div>
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredEvents.map((event) => (
                                <motion.div
                                    variants={fadeUp}
                                    key={event.id}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={getImagePath(event.image_url)}
                                            alt={event.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md ${getStatusColor(event.status)}`}>
                                                {event.status === 'Live' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping" />}
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="text-xs font-bold text-innovationPurple uppercase tracking-wider mb-2">
                                            {event.category}
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-deepCircuitBlue mb-3 group-hover:text-primaryTechBlue transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">
                                            {event.description}
                                        </p>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </div>
                                            {forms[event.id] ? (
                                                <Link to={`/register/${forms[event.id]}`} className="text-primaryTechBlue hover:text-innovationPurple transition-colors font-medium flex items-center">
                                                    Register <ArrowRight className="h-4 w-4 ml-1" />
                                                </Link>
                                            ) : (
                                                <button className="text-gray-400 font-medium flex items-center cursor-default">
                                                    No Form <ArrowRight className="h-4 w-4 ml-1 opacity-20" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Calendar className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg">No events found in this category.</p>
                        </div>
                    )}

                </div>
            </section>
        </div >
    );
}
