import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["Breakfast", "Lunch", "Dinner", "Mexican", "Italian", "Desserts", "Drinks"];

const categoryEmoji = {
  Breakfast: "🍳", Lunch: "🍱", Dinner: "🍽️",
  Mexican: "🌮", Italian: "🍝", Desserts: "🍰", Drinks: "🥤",
};

const OurHomeMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:4000/api/items")
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          const cat = item.category || "Uncategorized";
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      })
      .catch(err => console.error("Failed to load menu items:", err));
  }, []);

  const getQuantity = (id) => cartItems.find((ci) => ci._id === id)?.quantity || 0;
  const displayItems = (menuData[activeCategory] || []).slice(0, 4);

  return (
    <section className="bg-[#1a0f07] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Handcrafted with love
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Our <span className="text-amber-400">Exquisite</span> Menu
          </h2>
          <p className="text-amber-200/40 text-sm mt-2">A Symphony of Flavours</p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "bg-white/3 border-amber-900/30 text-amber-200/40 hover:text-amber-300 hover:bg-amber-900/20"
              }`}
            >
              <span>{categoryEmoji[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayItems.length === 0 ? (
            <div className="col-span-full text-center py-20 text-amber-200/30 text-sm">
              No items in this category yet.
            </div>
          ) : (
            displayItems.map((item) => {
              const qty = getQuantity(item._id);
              return (
                <div
                  key={item._id}
                  className="bg-white/5 border border-amber-900/20 rounded-2xl overflow-hidden flex flex-col hover:border-amber-700/40 transition-colors duration-200"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2.5 py-1 rounded-lg">
                      <span className="text-amber-400 font-bold text-sm">
                        Rs {Number(item.price).toFixed(0)}
                      </span>
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

                    <div className="mt-auto">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between bg-amber-900/20 border border-amber-800/30 rounded-xl px-3 py-1.5">
                          <button
                            onClick={() => qty > 1 ? updateQuantity(item._id, qty - 1) : removeFromCart(item._id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                          >
                            <FaMinus className="text-[10px]" />
                          </button>
                          <span className="text-amber-200 font-bold text-sm">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item._id, qty + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-full py-2 rounded-xl text-xs font-bold uppercase text-[#1a0f07] bg-amber-500 hover:bg-amber-400 transition-colors"
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

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            to="/menu"
            className="flex items-center gap-2 px-7 py-3 rounded-xl border border-amber-700/30 text-amber-300 text-sm hover:bg-amber-900/20 transition-colors"
          >
            Explore Full Menu
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurHomeMenu;