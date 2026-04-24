import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { FaMinus, FaPlus, FaUtensils } from "react-icons/fa";
import axios from "axios";

const categories = ["Breakfast", "Lunch", "Dinner", "Desserts", "Drinks"];

const categoryEmoji = {
    Breakfast: "🍳", Lunch: "🍱", Dinner: "🍽️",
    Desserts: "🍰", Drinks: "🥤",
};

const OurMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [animating, setAnimating] = useState(false);
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/items");
                const byCategory = res.data.reduce((acc, item) => {
                    const cat = item.category || "Uncategorized";
                    acc[cat] = acc[cat] || [];
                    acc[cat].push(item);
                    return acc;
                }, {});
                setMenuData(byCategory);
            } catch (error) {
                console.error("Failed to load menu items: ", error);
            }
        };
        fetchMenu();
    }, []);

    const handleCategoryChange = (cat) => {
        if (cat === activeCategory) return;
        setAnimating(true);
        setTimeout(() => { setActiveCategory(cat); setAnimating(false); }, 200);
    };

    const getCartEntry = (id) => cartItems.find((ci) => ci._id === id);
    const getQuantity = (id) => getCartEntry(id)?.quantity || 0;
    const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

    return (
        <div className="relative min-h-screen bg-[#1a0f07] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-800/8 blur-[100px] pointer-events-none" />

            {/* Vertical accent lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-amber-600/8 via-amber-600/4 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-amber-600/8 via-amber-600/4 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ─── Header ─── */}
                <div className="text-center mb-12 space-y-3">
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                        <FaUtensils className="text-xs" />
                        Full Menu
                    </div>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Our{" "}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                            Exquisite
                        </span>{" "}
                        Menu
                    </h1>
                    <p className="text-amber-200/40 text-sm tracking-widest uppercase">
                        A Symphony of Flavours
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/40" />
                    </div>
                </div>

                {/* ─── Category Pills ─── */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                                activeCategory === cat
                                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-900/30"
                                    : "bg-white/3 border-amber-900/30 text-amber-200/40 hover:text-amber-300 hover:bg-amber-900/20 hover:border-amber-800/50"
                            }`}
                        >
                            <span>{categoryEmoji[cat]}</span>
                            <span>{cat}</span>
                        </button>
                    ))}
                </div>

                {/* ─── Count label ─── */}
                <div className="flex items-center justify-between mb-6 px-1">
                    <p className="text-amber-200/30 text-xs">
                        {displayItems.length} item{displayItems.length !== 1 ? 's' : ''} in{" "}
                        <span className="text-amber-400/60">{activeCategory}</span>
                    </p>
                </div>

                {/* ─── Grid ─── */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-200 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    {displayItems.length === 0 ? (
                        <div className="col-span-full text-center py-24 text-amber-200/25 text-sm">
                            No items in this category yet.
                        </div>
                    ) : (
                        displayItems.map((item) => {
                            const cartEntry = getCartEntry(item._id);
                            const quantity = cartEntry?.quantity || 0;

                            return (
                                <div
                                    key={item._id}
                                    className="group bg-white/3 border border-amber-900/25 rounded-2xl overflow-hidden flex flex-col hover:border-amber-700/40 hover:bg-amber-900/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/30"
                                >
                                    {/* Image */}
                                    <div className="relative h-40 bg-black/20 overflow-hidden">
                                        <img
                                            src={item.imageUrl || item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07]/80 via-transparent to-transparent" />
                                        {/* Price badge */}
                                        <div className="absolute bottom-3 left-3 bg-[#1a0f07]/80 backdrop-blur-sm border border-amber-700/30 px-2.5 py-1 rounded-lg">
                                            <span className="text-amber-400 font-bold text-xs">
                                                Rs {Number(item.price).toFixed(0)}
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

                                        {/* Cart controls */}
                                        <div className="mt-auto">
                                            {quantity > 0 ? (
                                                <div className="flex items-center justify-between bg-amber-900/20 border border-amber-800/30 rounded-xl px-3 py-1.5">
                                                    <button
                                                        onClick={() => quantity > 1
                                                            ? updateQuantity(cartEntry._id, quantity - 1)
                                                            : removeFromCart(cartEntry._id)
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110"
                                                    >
                                                        <FaMinus className="text-[10px]" />
                                                    </button>
                                                    <span className="text-amber-200 font-bold text-sm min-w-[24px] text-center">{quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110"
                                                    >
                                                        <FaPlus className="text-[10px]" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(item, 1)}
                                                    className="w-full py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default OurMenu;