import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { bannerAssets } from '../assets/dummydata'

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { bannerImage } = bannerAssets;

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="bg-[#1a0f07] py-16 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* Left */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                    <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
                        Fresh · Fast · Flavourful
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                        Craving{' '}
                        <span className="text-amber-400">Something Good?</span>
                    </h1>

                    <p className="text-amber-200/60 text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Hot, handcrafted meals at your doorstep in under{' '}
                        <span className="text-amber-400 font-medium">60 minutes</span>.
                        Our chefs cook with love, our riders deliver with speed.
                    </p>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex max-w-md mx-auto lg:mx-0">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search momos, biryani, pizza..."
                            className="flex-1 px-4 py-3 bg-white/5 border border-amber-700/30 rounded-l-xl text-white placeholder-amber-200/30 text-sm focus:outline-none focus:border-amber-500/60"
                        />
                        <button
                            type="submit"
                            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-[#1a0f07] font-semibold text-sm rounded-r-xl transition-colors"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    {/* Stats */}
                    <div className="flex gap-8 justify-center lg:justify-start text-center">
                        {[
                            { value: '500+', label: 'Dishes' },
                            { value: '30 min', label: 'Delivery' },
                            { value: '4.9★', label: 'Rating' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-white font-bold text-lg">{stat.value}</p>
                                <p className="text-amber-200/50 text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Image */}
                <div className="flex-1 flex justify-center">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-amber-500/40">
                        <img
                            src={bannerImage}
                            alt="Delicious food"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;