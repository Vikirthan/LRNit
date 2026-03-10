import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

const CATEGORIES = ['All', 'Events', 'Team Moments', 'Workshops', 'Technical Activities', 'Community Activities'];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    // Fallback temporary data
    const fallbackData = [
        { id: '1', title: 'Campus Hackathon 2025', category: 'Events', photo_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', date: '2025-03-10' },
        { id: '2', title: 'React Workshop', category: 'Workshops', photo_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', date: '2025-02-15' },
        { id: '3', title: 'Team Building Retreat', category: 'Team Moments', photo_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', date: '2025-01-20' },
        { id: '4', title: 'AI Seminar', category: 'Technical Activities', photo_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', date: '2024-11-05' },
        { id: '5', title: 'Tree Planting Drive', category: 'Community Activities', photo_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', date: '2024-10-12' },
        { id: '6', title: 'Annual Tech Summit', category: 'Events', photo_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', date: '2024-09-25' },
        { id: '7', title: 'Brainstorming Session', category: 'Team Moments', photo_url: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80', date: '2024-08-10' },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) {
                    setImages(data);
                } else {
                    setImages(fallbackData);
                }
            } catch (err) {
                console.warn("Supabase error fetching gallery. Using fallback data.");
                setImages(fallbackData);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <div className="w-full bg-lightTechBackground min-h-screen pb-24">
            {/* Header */}
            <section className="pt-32 pb-16 bg-white border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full circuit-pattern opacity-10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-6xl font-display font-bold text-deepCircuitBlue mb-6"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryTechBlue to-innovationPurple">Gallery</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Moments of innovation, collaboration, and impactful leadership captured in time.
                    </motion.p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-deepCircuitBlue text-white shadow-md shadow-deepCircuitBlue/20 scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-primaryTechBlue'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryTechBlue"></div>
                        </div>
                    ) : filteredImages.length > 0 ? (
                        <motion.div
                            layout
                            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            <AnimatePresence>
                                {filteredImages.map((img) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={img.id}
                                        className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-white"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img.photo_url || img.imageUrl}
                                            alt={img.title}
                                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-deepCircuitBlue/90 via-deepCircuitBlue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <ZoomIn className="text-white h-8 w-8 mb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 ease-out" />
                                            <span className="text-xs font-bold text-innovationPurple uppercase tracking-wider mb-1 bg-white/10 w-max px-2 py-1 rounded-sm backdrop-blur-sm">
                                                {img.category}
                                            </span>
                                            <h3 className="text-xl font-display font-semibold text-white">{img.title}</h3>
                                            {img.date && (
                                                <p className="text-white/70 text-sm mt-1">{new Date(img.date).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                            <ImageIcon className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg">No authentic photos found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="max-w-5xl w-full max-h-[85vh] bg-transparent flex flex-col items-center pb-8 rounded-xl overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.photo_url || selectedImage.imageUrl}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[calc(85vh-80px)] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="w-full text-center mt-6">
                                <h3 className="text-2xl font-display font-bold text-white mb-2">{selectedImage.title}</h3>
                                <p className="text-white/60">
                                    <span className="text-innovationPurple font-medium mr-2">{selectedImage.category}</span>
                                    {selectedImage.date && `• ${new Date(selectedImage.date).toLocaleDateString()}`}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
