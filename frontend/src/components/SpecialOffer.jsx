import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext/CartContext';
import { FaStar } from 'react-icons/fa';
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
        <section className="bg-[#1a0f07] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
                        Customer Favourites
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Most <span className="text-amber-400">Ordered</span> Items
                    </h2>
                    <p className="text-amber-200/50 text-sm mt-3 max-w-md mx-auto">
                        All-time favourites our customers can't get enough of.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {displayList.map((item) => {
                        const cartItem = cartItems.find(ci => ci.item._id === item._id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        const cartId = cartItem?._id;

                        return (
                            <div
                                key={item._id}
                                className="bg-white/5 border border-amber-900/20 rounded-2xl overflow-hidden flex flex-col hover:border-amber-700/40 transition-colors duration-200"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-lg">
                                        <FaStar className="text-amber-400 text-xs" />
                                        <span className="text-amber-300 text-xs font-bold">{item.rating}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-4 flex flex-col flex-grow gap-3">
                                    <div>
                                        <h3 className="text-amber-100 font-semibold text-sm mb-1">{item.name}</h3>
                                        <p className="text-amber-200/40 text-xs leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-amber-400 font-bold text-sm">
                                            Rs {Number(item.price).toFixed(0)}
                                        </span>

                                        {qty > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => qty > 1 ? updateQuantity(cartId, qty - 1) : removeFromCart(cartId)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                                                >
                                                    <HiMinus className="text-xs" />
                                                </button>
                                                <span className="text-amber-200 font-bold text-sm w-5 text-center">{qty}</span>
                                                <button
                                                    onClick={() => updateQuantity(cartId, qty + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                                                >
                                                    <HiPlus className="text-xs" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item, 1)}
                                                className="px-4 py-1.5 rounded-xl text-xs font-bold text-[#1a0f07] bg-amber-500 hover:bg-amber-400 transition-colors"
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

                {/* Show More/Less */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2.5 rounded-xl border border-amber-700/30 text-amber-300 text-sm hover:bg-amber-900/20 transition-colors"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;