import React from "react";
import { useCart } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const API_URL = "http://localhost:4000";

const buildImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_URL}/uploads/${path.replace(/^\/uploads\//, "")}`;
};

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

  return (
    <div className="min-h-screen bg-[#1a0f07] text-white px-4 py-14">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Your <span className="text-amber-400">Cart</span>
        </h1>
        <p className="text-amber-200/40 text-sm mb-8">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <FaShoppingCart className="text-5xl text-amber-800/40 mx-auto" />
            <p className="text-amber-200/50">Your cart is empty</p>
            <Link to="/menu" className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-[#1a0f07] bg-amber-500 hover:bg-amber-400 transition-colors">
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-8">
              {cartItems.map(({ _id, name, price, imageUrl, quantity }) => (
                <div key={_id} className="flex items-center gap-4 bg-white/5 border border-amber-900/20 rounded-2xl p-3 hover:border-amber-700/40 transition-colors">

                  {/* Image */}
                  <img
                    src={buildImageUrl(imageUrl)}
                    alt={name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Name + Price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-amber-100 font-semibold text-sm truncate">{name}</p>
                    <p className="text-amber-400 text-xs mt-0.5">Rs {Number(price).toFixed(0)} each</p>
                    <button
                      onClick={() => removeFromCart(_id)}
                      className="text-red-400/50 hover:text-red-400 text-xs mt-1 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => quantity > 1 ? updateQuantity(_id, quantity - 1) : removeFromCart(_id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="text-amber-200 font-bold text-sm w-5 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(_id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-300"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>

                  {/* Line total */}
                  <p className="text-amber-300 font-bold text-sm w-20 text-right flex-shrink-0">
                    Rs {(price * quantity).toFixed(0)}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-amber-900/30 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-amber-200/40 text-xs mb-1">Order Total</p>
                <p className="text-2xl font-bold text-amber-400">Rs {Number(totalAmount).toFixed(0)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/menu" className="px-5 py-2.5 rounded-xl text-sm text-amber-300 border border-amber-700/40 hover:bg-amber-900/20 transition-colors">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#1a0f07] bg-amber-500 hover:bg-amber-400 transition-colors">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;