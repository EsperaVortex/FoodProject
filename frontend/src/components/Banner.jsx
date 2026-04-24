import React, { useState, useEffect } from 'react'
import { FaSearch, FaFire, FaClock, FaStar } from "react-icons/fa";
import { bannerAssets } from '../assets/dummydata'

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const { bannerImage } = bannerAssets;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const stats = [
        { icon: <FaFire className="text-amber-400" />, value: '500+', label: 'Dishes' },
        { icon: <FaClock className="text-amber-400" />, value: '30 min', label: 'Delivery' },
        { icon: <FaStar className="text-amber-400" />, value: '4.9★', label: 'Rating' },
    ];

    return (
        <div className="relative overflow-hidden bg-[#1a0f07]">

            {/* Background layered glow blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-amber-700/20 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-900/20 blur-[120px] pointer-events-none" />

            {/* Subtle grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Diagonal decorative line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-600/20 to-transparent" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-800/10 to-transparent hidden lg:block" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* ─── LEFT CONTENT ─── */}
                    <div
                        className={`flex-1 space-y-7 text-center lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        {/* Eyebrow badge */}
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
                            <FaFire className="text-amber-500 animate-pulse" />
                            Fresh • Fast • Flavourful
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white"
                            style={{ fontFamily: "'Georgia', serif" }}>
                            Craving <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                                    Something Good?
                                </span>
                                {/* underline squiggle */}
                                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full opacity-60" />
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-amber-200/70 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                            Hot, handcrafted meals at your doorstep in under <strong className="text-amber-400 font-semibold">60 minutes</strong>. Our chefs cook with love, our riders deliver with speed.
                        </p>

                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto lg:mx-0 group">
                            <div className="relative flex w-full shadow-xl shadow-amber-900/30">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <FaSearch className="text-amber-500/70 text-sm" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search momos, biryani, pizza..."
                                    className="w-full pl-11 pr-4 py-4 bg-white/5 border border-amber-700/30 rounded-l-2xl text-white placeholder-amber-200/30 text-sm focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="px-5 py-4 bg-gradient-to-br from-amber-500 to-amber-700 text-[#1a0f07] font-bold text-sm rounded-r-2xl hover:from-amber-400 hover:to-amber-600 transition-all duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-amber-600/30 active:scale-[0.98]"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Stats row */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-2">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                        {stat.icon}
                                        <span className="text-white font-bold text-base">{stat.value}</span>
                                    </div>
                                    <span className="text-amber-200/50 text-xs tracking-wide">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ─── RIGHT CONTENT - IMAGE ─── */}
                    <div
                        className={`flex-1 flex justify-center items-center relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        {/* Outer decorative ring */}
                        <div className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-amber-600/15 animate-[spin_25s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500/60" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-700/40" />
                        </div>
                        <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-dashed border-amber-700/20 animate-[spin_20s_linear_infinite_reverse]" />

                        {/* Glow behind image */}
                        <div className="absolute w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] rounded-full bg-amber-600/20 blur-[50px]" />

                        {/* Image ring gradient border */}
                        <div className="relative w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] rounded-full p-[3px] bg-gradient-to-br from-amber-400 via-orange-600 to-amber-900 shadow-2xl shadow-amber-900/60 z-20">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#1a0f07]">
                                <img
                                    src={bannerImage}
                                    alt="Delicious food"
                                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Floating badge - top right */}
                        <div className="absolute top-4 right-4 sm:right-0 z-30 bg-[#1a0f07]/80 backdrop-blur-sm border border-amber-700/30 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 animate-[bounce_3s_ease-in-out_infinite]">
                            <span className="text-xl">🔥</span>
                            <div>
                                <p className="text-white text-xs font-bold">Trending</p>
                                <p className="text-amber-400/80 text-[10px]">Momo Special</p>
                            </div>
                        </div>

                        {/* Floating badge - bottom left */}
                        <div className="absolute bottom-4 left-4 sm:left-0 z-30 bg-[#1a0f07]/80 backdrop-blur-sm border border-amber-700/30 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
                            <span className="text-xl">⚡</span>
                            <div>
                                <p className="text-white text-xs font-bold">Fast Delivery</p>
                                <p className="text-amber-400/80 text-[10px]">~30 min avg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a0f07] to-transparent pointer-events-none" />
        </div>
    );
};

export default Banner;