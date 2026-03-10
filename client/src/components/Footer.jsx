import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const location = useLocation();

    // Do not show footer on admin routes
    if (location.pathname.startsWith('/lrnit-admin')) {
        return null;
    }

    return (
        <footer className="bg-[#051B40] text-gray-300 py-12 border-t flex-shrink-0 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-innovationPurple blur-[120px] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primaryTechBlue blur-[120px] rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2 group w-max">
                            <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                                <Cpu className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-2xl tracking-tight text-white leading-none">
                                    LRN<span className="text-innovationPurple">it</span>
                                </span>
                                <span className="text-[0.65rem] font-medium tracking-widest text-gray-400 uppercase">
                                    Learn. Build. Lead.
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Empowering students to learn deeply, build confidently, innovate responsibly, and lead with purpose in the tech ecosystem.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primaryTechBlue hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primaryTechBlue hover:text-white transition-all">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primaryTechBlue hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Team', 'Gallery', 'Live Events'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-sm text-gray-400 hover:text-primaryTechBlue transition-colors flex items-center space-x-2"
                                    >
                                        <span className="h-1 w-1 bg-innovationPurple rounded-full"></span>
                                        <span>{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get Involved */}
                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Get Involved</h3>
                        <ul className="space-y-3">
                            {['Join as a Member', 'Sponsor an Event', 'Partner with Us', 'Open Roles'].map((item) => (
                                <li key={item}>
                                    <a href="/contact" className="text-sm text-gray-400 hover:text-primaryTechBlue transition-colors flex items-center space-x-2">
                                        <span className="h-1 w-1 bg-innovationPurple rounded-full"></span>
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-sm text-gray-400">
                                <MapPin className="h-5 w-5 text-primaryTechBlue shrink-0 mt-0.5" />
                                <span>University Campus, Tech Building, Innovation Lab 304</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-gray-400">
                                <Phone className="h-5 w-5 text-primaryTechBlue shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-gray-400">
                                <Mail className="h-5 w-5 text-primaryTechBlue shrink-0" />
                                <span>contact@lrnit.org</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LRNit Student Organization. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
