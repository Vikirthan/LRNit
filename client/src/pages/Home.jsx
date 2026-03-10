import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Wrench, Rocket, ChevronRight, Users, Code, Lightbulb, Target, Globe, Cpu } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden circuit-pattern">
                {/* Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primaryTechBlue/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-innovationPurple/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-primaryTechBlue/20 px-4 py-2 rounded-full mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primaryTechBlue animate-pulse" />
                        <span className="text-sm font-medium text-deepCircuitBlue">Welcome to the future of student innovation</span>
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight text-deepCircuitBlue"
                        {...fadeIn}
                    >
                        <span className="text-primaryTechBlue">Learn.</span>{' '}
                        <span className="text-innovationPurple">Build.</span>{' '}
                        <span>Lead.</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        We are a student-driven ecosystem where creativity, engineering, and leadership shape the next generation of changemakers.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Link to="/contact" className="px-8 py-4 bg-primaryTechBlue hover:bg-deepCircuitBlue text-white rounded-xl font-medium transition-all shadow-lg shadow-primaryTechBlue/30 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center">
                            Join LRNit <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/team" className="px-8 py-4 bg-white hover:bg-gray-50 text-deepCircuitBlue border border-gray-200 rounded-xl font-medium transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-center">
                            Explore Teams
                        </Link>
                        <Link to="/events" className="px-8 py-4 text-gray-600 hover:text-innovationPurple font-medium transition-colors w-full sm:w-auto text-center flex items-center justify-center group">
                            View Events
                            <span className="block ml-2 w-0 h-0.5 bg-innovationPurple group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                        </Link>
                    </motion.div>
                </div>

                {/* Decorative Circuit Lines Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-lightTechBackground to-transparent pointer-events-none" />
            </section>

            {/* Pillars Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-deepCircuitBlue mb-4">Our Core Pillars</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">The foundation of everything we do at LRNit.</p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primaryTechBlue/30 via-innovationPurple/30 to-primaryTechBlue/30 -z-10" />

                        {[
                            {
                                icon: <BookOpen className="h-8 w-8 text-primaryTechBlue" />,
                                title: "Learn",
                                desc: "Deep knowledge acquisition through hands-on technical workshops and peer-to-peer mentoring."
                            },
                            {
                                icon: <Wrench className="h-8 w-8 text-innovationPurple" />,
                                title: "Build",
                                desc: "Turning ideas into reality by constructing real-world projects and engineering solutions."
                            },
                            {
                                icon: <Rocket className="h-8 w-8 text-gradientPurple" />,
                                title: "Lead",
                                desc: "Developing soft skills and purposeful leadership to guide teams and create impact."
                            }
                        ].map((pillar, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className="bg-lightTechBackground/50 backdrop-blur border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primaryTechBlue/5 rounded-full blur-[40px] group-hover:bg-primaryTechBlue/10 transition-colors" />
                                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-display font-bold text-deepCircuitBlue mb-3 relative z-10">{pillar.title}</h3>
                                <p className="text-gray-600 relative z-10 leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-24 bg-lightTechBackground relative overflow-hidden">
                {/* Abstract chip shape */}
                <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 border-[40px] border-primaryTechBlue/5 rounded-3xl rotate-45 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-display font-bold text-deepCircuitBlue mb-6">What We Do</h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    We bridge the gap between theoretical knowledge and practical application through a variety of engaging activities and initiatives.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        { icon: <Code />, title: "Technical Events", desc: "Hackathons, coding challenges, and tech talks from industry experts." },
                                        { icon: <Users />, title: "Non-Technical Events", desc: "Debates, management games, and networking mixers to build soft skills." },
                                        { icon: <Lightbulb />, title: "Student Initiatives", desc: "Incubating student-led tech projects and providing mentorship." }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex flex-start space-x-4">
                                            <div className="shrink-0 mt-1 h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primaryTechBlue">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-deepCircuitBlue mb-1">{item.title}</h4>
                                                <p className="text-gray-500">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        <div className="md:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-square md:aspect-auto md:h-[500px] bg-gradient-to-br from-primaryTechBlue to-innovationPurple rounded-3xl overflow-hidden p-1 shadow-2xl relative">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-deepCircuitBlue/90 to-transparent"></div>

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="glassmorphism !bg-white/10 p-6 rounded-2xl border-white/10">
                                            <h3 className="text-2xl font-display font-bold text-white mb-2">Campus Rush 2026</h3>
                                            <p className="text-white/80 text-sm mb-4">Our biggest flagship technical and cultural fest coming soon.</p>
                                            <Link to="/events" className="text-white text-sm font-medium hover:text-primaryTechBlue flex items-center">
                                                Explore details <ChevronRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold text-deepCircuitBlue mb-6">Why Join LRNit?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                            Be part of a vibrant, collaborative culture where your ideas are valued and your growth is accelerated.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            { value: "30+", label: "Active Members", desc: "A tight-knit community of passionate individuals." },
                            { value: "100%", label: "Student-Led", desc: "Run entirely by students, for students." },
                            { value: "♾️", label: "Collaborative Culture", desc: "We believe in lifting each other up through shared knowledge." }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-lightTechBackground/50 border border-primaryTechBlue/10 hover:border-primaryTechBlue/30 hover:shadow-lg transition-all"
                            >
                                <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryTechBlue to-innovationPurple mb-4">
                                    {stat.value}
                                </div>
                                <h4 className="text-xl font-semibold text-deepCircuitBlue mb-2">{stat.label}</h4>
                                <p className="text-gray-500 text-sm">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SDG Section */}
            <section className="py-24 bg-gradient-to-br from-deepCircuitBlue to-[#0a192f] text-white relative overflow-hidden">
                {/* Circuit Pattern Overlay */}
                <div className="absolute inset-0 circuit-pattern opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-6 text-white">Contributing to Global Goals</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">LRNit aligns its initiatives with the UN Sustainable Development Goals to create meaningful, lasting impact.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { num: 4, title: "Quality Education", icon: <BookOpen className="h-10 w-10" />, color: "bg-[#C5192D]" },
                            { num: 9, title: "Industry, Innovation and Infrastructure", icon: <Cpu className="h-10 w-10" />, color: "bg-[#FD6925]" },
                            { num: 17, title: "Partnerships for the Goals", icon: <Globe className="h-10 w-10" />, color: "bg-[#19486A]" }
                        ].map((sdg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="glassmorphism !bg-white/5 border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
                            >
                                <div className={`w-16 h-16 ${sdg.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {sdg.icon}
                                </div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <span className="text-white/50 font-display font-bold text-4xl">SDG {sdg.num}</span>
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-white">{sdg.title}</h4>
                                <p className="text-sm text-gray-400">
                                    {idx === 0 && "Driving inclusive and equitable quality education through accessible tech workshops."}
                                    {idx === 1 && "Fostering innovation by providing the tools and environment for students to build new solutions."}
                                    {idx === 2 && "Collaborating with industry partners, academia, and other organizations to amplify our impact."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
