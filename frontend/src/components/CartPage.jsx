import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTimes, FaShoppingCart, FaArrowRight } from "react-icons/fa";

const API_URL = "http://localhost:4000";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  const buildImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${API_URL}/uploads/${path.replace(/^\/uploads\//, "")}`;
  };

  return (
    <div className="min-h-screen bg-[#1a0f07] text-white px-4 py-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            Your <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className="text-amber-200/40 text-sm">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-28 space-y-5">
            <FaShoppingCart className="text-6xl text-amber-800/40 mx-auto" />
            <p className="text-amber-200/50 text-lg">Your cart is empty</p>
            <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/30">
              Browse Menu <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {cartItems.map(({ _id, name, price, imageUrl, quantity }) => (
                <div key={_id} className="group bg-white/3 border border-amber-900/25 rounded-2xl overflow-hidden flex flex-col hover:border-amber-700/40 hover:bg-amber-900/15 transition-all duration-300">

                  {/* Image */}
                  <div className="relative h-44 bg-black/20 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(buildImageUrl(imageUrl))}>
                    <img src={buildImageUrl(imageUrl)} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-[#1a0f07]/80 backdrop-blur-sm border border-amber-700/30 px-2.5 py-1 rounded-lg">
                      <span className="text-amber-400 font-bold text-xs">Rs {Number(price).toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 gap-4">
                    <h3 className="text-amber-100 font-bold text-base" style={{ fontFamily: "'Georgia', serif" }}>{name}</h3>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-800/30 rounded-xl px-3 py-1.5">
                        <button onClick={() => quantity > 1 ? updateQuantity(_id, quantity - 1) : removeFromCart(_id)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110">
                          <FaMinus className="text-[10px]" />
                        </button>
                        <span className="text-amber-200 font-bold text-sm min-w-[20px] text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(_id, quantity + 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 transition-all hover:scale-110">
                          <FaPlus className="text-[10px]" />
                        </button>
                      </div>
                      <span className="text-amber-300 font-bold text-sm">Rs {(price * quantity).toFixed(0)}</span>
                    </div>

                    <button onClick={() => removeFromCart(_id)} className="text-red-400/60 hover:text-red-400 text-xs transition-colors text-left">
                      Remove item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-amber-900/40 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                  <p className="text-amber-200/40 text-sm">Order Total</p>
                  <p className="text-3xl font-black text-amber-400" style={{ fontFamily: "'Georgia', serif" }}>
                    Rs {Number(totalAmount).toFixed(0)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/menu" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-amber-300 border border-amber-700/40 hover:bg-amber-900/25 hover:border-amber-600/50 transition-all duration-200">
                    Continue Shopping
                  </Link>
                  <Link to="/checkout" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/30">
                    Checkout <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border border-amber-900/30" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-[#1a0f07] border border-amber-800/40 rounded-full text-amber-400 hover:text-amber-300 transition-colors">
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;