import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Live Events', path: '/events' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Do not show navbar on admin routes
    if (location.pathname.startsWith('/lrnit-admin')) {
        return null;
    }

    return (
        <nav className="fixed w-full z-50 glassmorphism border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-transparent group-hover:bg-primaryTechBlue/5 transition-colors p-1 rounded-xl">
                            <img src="/logo.png" alt="LRNit Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-2xl tracking-tight text-deepCircuitBlue leading-none">
                                LRN<span className="text-innovationPurple">it</span>
                            </span>
                            <span className="text-[0.65rem] font-medium tracking-widest text-gray-500 uppercase">
                                Learn. Build. Lead.
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-primaryTechBlue relative ${location.pathname === link.path
                                    ? 'text-primaryTechBlue'
                                    : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primaryTechBlue to-innovationPurple rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primaryTechBlue focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glassmorphism border-t border-gray-100"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-primaryTechBlue/10 text-primaryTechBlue'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-primaryTechBlue'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
