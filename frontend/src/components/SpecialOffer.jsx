import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext/CartContext';
import { FaFire, FaHeart, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HiMinus, HiPlus } from "react-icons/hi";
import axios from 'axios';

const SpecialOffer = () => {
    const [showAll, setShowAll] = useState(false);
    const [items, setItems] = useState([]);
    const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

    useEffect(() => {
        axios.get('http://localhost:4000/api/orders/top-items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

    return (
        <section className="relative bg-[#1a0f07] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-900/8 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ─── Header ─── */}
                <div className="text-center mb-14 space-y-3">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                        <FaFire className="animate-pulse text-xs" />
                        Customer Favourites
                    </div>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Most{" "}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                            Ordered
                        </span>{" "}
                        Items
                    </h2>
                    <p className="text-amber-200/40 text-sm max-w-xl mx-auto leading-relaxed">
                        All-time favourites our customers can't get enough of — topping the charts every week.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/40" />
                    </div>
                </div>

                {/* ─── Cards Grid ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {displayList.map((item) => {
                        const cartItem = cartItems.find(ci => ci.item._id === item._id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        const cartId = cartItem?._id;

                        return (
                            <div
                                key={item._id}
                                className="group relative bg-white/3 border border-amber-900/25 rounded-2xl overflow-hidden flex flex-col hover:border-amber-700/40 hover:bg-amber-900/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/30"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07]/90 via-[#1a0f07]/20 to-transparent" />

                                    {/* Rating + Hearts overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-amber-900/30">
                                            <FaStar className="text-amber-400 text-xs" />
                                            <span className="text-amber-300 font-bold text-xs">{item.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-red-900/30">
                                            <FaHeart className="text-red-400 text-xs" />
                                            <span className="text-red-300 font-bold text-xs">{item.hearts}</span>
                                        </div>
                                    </div>

                                    {/* Hot badge */}
                                    <div className="absolute top-3 right-3 bg-red-500/20 border border-red-500/30 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                                        <span className="text-red-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                                            <FaFire className="text-[8px]" /> Hot
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-4 flex flex-col flex-grow gap-3">
                                    <div>
                                        <h3
                                            className="text-amber-100 font-bold text-base leading-snug mb-1"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {item.name}
                                        </h3>
                                        <p className="text-amber-200/40 text-xs leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-3">
                                        <span className="text-amber-400 font-bold text-base">
                                            Rs {Number(item.price).toFixed(0)}
                                        </span>

                                        {qty > 0 ? (
                                            <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-800/30 rounded-xl px-2.5 py-1.5">
                                                <button
                                                    onClick={() => qty > 1 ? updateQuantity(cartId, qty - 1) : removeFromCart(cartId)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110"
                                                >
                                                    <HiMinus className="text-xs" />
                                                </button>
                                                <span className="text-amber-200 font-bold text-sm min-w-[20px] text-center">{qty}</span>
                                                <button
                                                    onClick={() => updateQuantity(cartId, qty + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110"
                                                >
                                                    <HiPlus className="text-xs" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item, 1)}
                                                className="px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ─── Show More/Less ─── */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group flex items-center gap-2.5 px-7 py-3 rounded-xl border border-amber-700/30 text-amber-300 text-sm font-semibold hover:bg-amber-900/25 hover:border-amber-600/50 transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/20"
                    >
                        <FaFire className="text-amber-500 text-xs group-hover:animate-pulse" />
                        <span>{showAll ? 'Show Less' : 'Show More'}</span>
                        {showAll
                            ? <FaChevronUp className="text-xs text-amber-500/60" />
                            : <FaChevronDown className="text-xs text-amber-500/60" />
                        }
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;