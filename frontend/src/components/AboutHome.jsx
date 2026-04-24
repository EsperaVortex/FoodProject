import React from 'react'
import { aboutfeature } from '../assets/dummydata'
import { FaInfoCircle } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import AboutImage from '../assets/AboutImage.png'

const AboutHome = () => {
    return (
        <section className="relative bg-[#1a0f07] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-amber-900/12 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-900/8 blur-[100px] pointer-events-none" />

            {/* Vertical accent lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-amber-600/8 via-amber-600/4 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">

                    {/* ─── Left: Image ─── */}
                    <div className="w-full lg:w-5/12 flex-shrink-0">
                        <div className="relative group">

                            {/* Decorative spinning ring */}
                            <div className="absolute -inset-4 rounded-[3rem] border border-dashed border-amber-700/15 animate-[spin_30s_linear_infinite]" />

                            {/* Glow behind */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-amber-600/10 blur-2xl" />

                            {/* Image frame */}
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-amber-800/30 group-hover:border-amber-700/50 transition-all duration-500 shadow-2xl shadow-black/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 via-transparent to-amber-600/5 z-10 pointer-events-none" />
                                <img
                                    src={AboutImage}
                                    alt="Restaurant"
                                    className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-[1.03] transition-transform duration-700"
                                />
                                {/* bottom gradient fade */}
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a0f07]/60 to-transparent z-10" />
                            </div>

                            {/* Floating stat card */}
                            <div className="absolute -bottom-5 -right-5 bg-[#1a0f07]/90 backdrop-blur-sm border border-amber-800/40 rounded-2xl px-4 py-3 shadow-xl z-20">
                                <p className="text-amber-400 font-black text-2xl" style={{ fontFamily: "'Georgia', serif" }}>10+</p>
                                <p className="text-amber-200/50 text-xs">Years of Taste</p>
                            </div>

                            {/* Floating stat card 2 */}
                            <div className="absolute -top-5 -left-5 bg-[#1a0f07]/90 backdrop-blur-sm border border-amber-800/40 rounded-2xl px-4 py-3 shadow-xl z-20">
                                <p className="text-amber-400 font-black text-2xl" style={{ fontFamily: "'Georgia', serif" }}>50k+</p>
                                <p className="text-amber-200/50 text-xs">Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    {/* ─── Right: Content ─── */}
                    <div className="w-full lg:w-7/12 space-y-10">

                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
                            <FaInfoCircle className="text-xs" />
                            Our Story
                        </div>

                        {/* Headline */}
                        <div className="space-y-3">
                            <h2
                                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08]"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Flavors{" "}
                                <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                                    with Style
                                </span>
                            </h2>
                            <p className="text-amber-200/50 text-lg font-light">
                                Where Flavors Dance &amp; Memories Bloom
                            </p>
                        </div>

                        {/* Pull quote */}
                        <div className="relative pl-5 border-l-2 border-amber-600/40">
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-500/60 to-transparent" />
                            <p className="text-amber-100/60 text-base sm:text-lg italic leading-relaxed font-light">
                                "In our kitchen, passion meets precision. We craft not just meals, but culinary journeys
                                that linger on the palate and in the heart."
                            </p>
                        </div>

                        {/* Feature grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {aboutfeature.map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/3 border border-amber-900/25 hover:border-amber-700/40 hover:bg-amber-900/15 transition-all duration-300"
                                >
                                    <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                        <item.icon className="text-xl text-white" />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-amber-100 font-bold text-base mb-1"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-amber-200/40 text-xs leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                to="/about"
                                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40"
                            >
                                <span>Unveil Our Legacy</span>
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;