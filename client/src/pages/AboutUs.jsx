import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Zap, Layers, Cpu, Globe } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 }
};

export default function AboutUs() {
    return (
        <div className="w-full bg-lightTechBackground min-h-screen pb-24">
            {/* Page Header */}
            <section className="pt-32 pb-16 bg-white relative overflow-hidden border-b border-gray-100">
                <div className="absolute top-0 right-0 w-1/2 h-full circuit-pattern opacity-10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-display font-bold text-deepCircuitBlue mb-6"
                    >
                        About <span className="text-primaryTechBlue">LRN</span><span className="text-innovationPurple">it</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        A collective of passionate students engineering the future through learning, building, and leading.
                    </motion.p>
                </div>
            </section>

            {/* Origin Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div className="md:w-1/2" {...fadeIn}>
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                                <div className="absolute inset-0 bg-primaryTechBlue/20 group-hover:bg-primaryTechBlue/0 transition-colors duration-500 Mix-blend-overlay z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000"
                                    alt="Team collaborating"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>

                        <motion.div className="md:w-1/2 space-y-6" {...fadeIn}>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-deepCircuitBlue">Our Story</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                LRNit was born from a simple observation: theoretical classroom knowledge is rarely enough to prepare students for the rapid pace of the modern tech industry. We needed a space to actually <strong>build</strong> things.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                What started as a small group of highly motivated students has evolved into a thriving ecosystem. We aren't just another tech club. We are a project-oriented, leadership-focused incubation hub where members are challenged to learn deeply and lead with purpose.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our uniqueness lies in our motto: <strong className="text-primaryTechBlue">Learn. Build. Lead.</strong> We don't just consume tutorials. We architect solutions, host massive technical events like Campus Rush, and actively contribute to the UN Sustainable Development Goals.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section (Cards) */}
            <section className="py-24 bg-gradient-to-br from-deepCircuitBlue to-primaryTechBlue relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CgkJPGc+CgkJCTxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDIiIHdpZHRoPSI1ODIiIHk9Ii0xIiB4PSItMSIvPgoJCTwvZz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNMzAgMjhoMnYyaC0yeiIvPgoJCTwvZz4KCTwvc3ZnPg==')] opacity-30"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            {...fadeIn}
                            className="glassmorphism !bg-white/10 border-white/20 p-10 rounded-3xl hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="h-16 w-16 bg-innovationPurple/30 rounded-2xl flex items-center justify-center mb-8 border border-innovationPurple/50">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-xl text-white/90 leading-relaxed font-light">
                                To empower students to learn deeply, build confidently, innovate responsibly, and lead with purpose.
                            </p>
                        </motion.div>

                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="glassmorphism !bg-white/10 border-white/20 p-10 rounded-3xl hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="h-16 w-16 bg-primaryTechBlue/30 rounded-2xl flex items-center justify-center mb-8 border border-primaryTechBlue/50">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Vision</h2>
                            <p className="text-xl text-white/90 leading-relaxed font-light">
                                To create a student-driven ecosystem where creativity, innovation, leadership, and collaboration shape the next generation of changemakers.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Themes */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div className="text-center mb-16" {...fadeIn}>
                        <h2 className="text-4xl font-display font-bold text-deepCircuitBlue mb-4">Our Core Themes</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">The guiding principles that dictate every workshop, project, and event we host.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Learning Through Action", icon: <Zap className="h-6 w-6" />, color: "text-yellow-500", bg: "bg-yellow-50" },
                            { title: "Building Real Projects", icon: <Layers className="h-6 w-6" />, color: "text-primaryTechBlue", bg: "bg-blue-50" },
                            { title: "Leadership Development", icon: <Target className="h-6 w-6" />, color: "text-innovationPurple", bg: "bg-purple-50" },
                            { title: "SDG Contribution", icon: <Globe className="h-6 w-6" />, color: "text-emerald-500", bg: "bg-emerald-50" },
                        ].map((theme, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`${theme.bg} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center`}
                            >
                                <div className={`p-4 rounded-full bg-white shadow-sm mb-4 ${theme.color}`}>
                                    {theme.icon}
                                </div>
                                <h3 className="text-lg font-bold text-deepCircuitBlue">{theme.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
