import React, { useState } from 'react'
import { FaRegEnvelope } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { GiChefToque } from "react-icons/gi";
import { socialIcons } from '../assets/dummydata'

const Footer = () => {
    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Menu', link: '/menu' },
        { name: 'About Us', link: '/about' },
        { name: 'Contact', link: '/contact' },
    ];

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setEmail('');
    };

    return (
        <footer className="relative bg-[#120a04] text-amber-100 overflow-hidden">

            {/* Background glow blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-amber-900/15 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-800/10 blur-[80px] pointer-events-none" />

            {/* Top border gradient */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />

            {/* Top wave divider */}
            <div className="relative">
                <svg viewBox="0 0 1440 40" className="w-full fill-[#1a0f07]" preserveAspectRatio="none">
                    <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-12">

                    {/* ─── Left: Brand + Newsletter ─── */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md" />
                                <GiChefToque className="relative text-3xl text-amber-400" />
                            </div>
                            <span
                                className="text-2xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Mitho-Munch
                            </span>
                        </div>

                        <p className="text-amber-200/50 text-sm leading-relaxed max-w-xs">
                            When culinary artistry meets doorstep convenience. Savor handcrafted perfection, delivered with care.
                        </p>

                        {/* Newsletter */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FaRegEnvelope className="text-amber-500 text-sm" />
                                <span className="text-amber-400 text-sm font-semibold tracking-wide">Exclusive Offers</span>
                            </div>

                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pr-28 rounded-xl bg-white/5 border border-amber-800/40 text-amber-100 text-sm placeholder-amber-200/25 focus:outline-none focus:border-amber-600/60 focus:bg-white/8 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-gradient-to-br from-amber-400 to-amber-600 text-[#120a04] text-sm font-bold rounded-lg flex items-center gap-1 hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-amber-900/30"
                                >
                                    {submitted ? '✓ Done!' : (
                                        <>Join <BiChevronRight className="text-base" /></>
                                    )}
                                </button>
                            </form>

                            {submitted && (
                                <p className="text-amber-400 text-xs font-medium animate-pulse">
                                    🎉 You're in! Expect delicious deals.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ─── Middle: Navigation ─── */}
                    <div className="sm:flex sm:justify-center">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600" />
                                <h3 className="text-base font-bold text-amber-300 tracking-wide uppercase text-xs">
                                    Navigation
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {navItems.map(item => (
                                    <li key={item.name}>
                                        <a
                                            href={item.link}
                                            className="group flex items-center gap-2 text-amber-200/50 hover:text-amber-300 text-sm transition-all duration-200"
                                        >
                                            <BiChevronRight className="text-amber-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200" />
                                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                                                {item.name}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ─── Right: Social ─── */}
                    <div className="lg:flex lg:justify-end">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600" />
                                <h3 className="text-xs font-bold text-amber-300 tracking-wide uppercase">
                                    Social Connect
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
                                    <a
                                        key={idx}
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-amber-900/30 hover:border-amber-700/50 hover:bg-amber-900/30 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                                        style={{ color }}
                                        title={label}
                                    >
                                        <Icon className="text-xl" />
                                        {/* tooltip */}
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a0f07] border border-amber-800/40 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                            {label}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            {/* Small tagline */}
                            <p className="text-amber-200/30 text-xs leading-relaxed max-w-[200px]">
                                Follow us for daily specials, behind-the-scenes, and foodie inspo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="relative pt-8">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-800/50 to-transparent mb-8" />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                        <p className="text-amber-200/30 text-xs">
                            © 2025 Mitho-Munch. All rights reserved.
                        </p>
                        <p className="text-amber-200/20 text-xs">
                            Made with ❤️ in Nepal
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;