import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts", "Drinks"];

const categoryEmoji = {
  All: "🍴", Breakfast: "🍳", Lunch: "🍱", Dinner: "🍽️",
  Desserts: "🍰", Drinks: "🥤",
};

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [allItems, setAllItems] = useState([]);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    axios.get("http://localhost:4000/api/items")
      .then(res => setAllItems(res.data))
      .catch(err => console.error("Failed to load menu items:", err));
  }, []);

  const getQuantity = (id) => cartItems.find((ci) => ci._id === id)?.quantity || 0;

  const displayItems = allItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#1a0f07] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">Full Menu</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Our <span className="text-amber-400">Exquisite</span> Menu
          </h1>
          <p className="text-amber-200/40 text-sm mt-2">A Symphony of Flavours</p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a dish..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-amber-900/30 text-white text-sm placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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

        {/* Item count */}
        <p className="text-amber-200/30 text-xs mb-6">
          {displayItems.length} item{displayItems.length !== 1 ? "s" : ""}{" "}
          {activeCategory !== "All" && <span>in <span className="text-amber-400/60">{activeCategory}</span></span>}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayItems.length === 0 ? (
            <div className="col-span-full text-center py-24 text-amber-200/25 text-sm">
              No items found.
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
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2.5 py-1 rounded-lg">
                      <span className="text-amber-400 font-bold text-xs">
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
      </div>
    </div>
  );
};

export default OurMenu;