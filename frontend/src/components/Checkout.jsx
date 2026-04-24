import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../CartContext/CartContext";
import axios from "axios";

const Input = ({ label, type = "text", name, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-amber-200/60 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-amber-900/30 text-white text-sm placeholder-amber-200/20 focus:outline-none focus:border-amber-600/60 focus:bg-white/8 transition-all duration-200"
    />
  </div>
);

const Checkout = () => {
  const { totalAmount, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", city: "", paymentMethod: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment_status");
    const sessionId = params.get("session_id");
    if (!paymentStatus) return;
    setLoading(true);
    if (paymentStatus === "success" && sessionId) {
      axios.post("http://localhost:4000/api/orders/confirm", { sessionId }, { headers: authHeaders })
        .then(({ data }) => { clearCart(); navigate("/myorder", { state: { order: data.order } }); })
        .catch(() => setError("Payment confirmation failed"))
        .finally(() => setLoading(false));
    } else {
      setError("Payment was cancelled or failed");
      setLoading(false);
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const subtotal = Number(totalAmount.toFixed(2));
      const tax = Number((subtotal * 0.05).toFixed(2));
      const payload = {
        ...formData, subtotal, tax,
        total: Number((subtotal + tax).toFixed(2)),
        items: cartItems.map(ci => ({
          item: { name: ci.item?.name || "Unknown Item", price: ci.item?.price || 0, imageUrl: ci.item?.imageUrl || "" },
          quantity: ci.quantity || 1,
        })),
      };
      const { data } = await axios.post("http://localhost:4000/api/orders", payload, { headers: authHeaders });
      if (formData.paymentMethod === "online") {
        window.location.href = data.checkoutUrl;
      } else {
        clearCart();
        navigate("/myorder", { state: { order: data.order } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <div className="min-h-screen bg-[#1a0f07] text-white py-14 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link to="/cart" className="inline-flex items-center gap-2 text-amber-400/70 hover:text-amber-300 text-sm mb-8 transition-colors">
          <FaArrowLeft className="text-xs" /> Back to Cart
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
            Check<span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">out</span>
          </h1>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">

          {/* Personal Info */}
          <div className="bg-white/3 border border-amber-900/25 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-amber-300 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              Delivery Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
            <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
          </div>

          {/* Order Summary + Payment */}
          <div className="space-y-5">

            {/* Summary */}
            <div className="bg-white/3 border border-amber-900/25 rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-bold text-amber-300 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                Order Summary
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cartItems.map(({ item, quantity }, index) => (
                  <div key={item?._id || index} className="flex justify-between text-xs text-amber-200/60 pb-2 border-b border-amber-900/20 last:border-0">
                    <span>{item?.name || "Unknown"} × {quantity || 1}</span>
                    <span className="text-amber-300/80">Rs {((item?.price || 0) * (quantity || 1)).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 space-y-1.5 text-sm">
                <div className="flex justify-between text-amber-200/50">
                  <span>Subtotal</span><span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between text-amber-200/50">
                  <span>Tax (5%)</span><span>Rs {tax}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-300 text-base pt-2 border-t border-amber-900/30 mt-1">
                  <span>Total</span><span>Rs {total}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white/3 border border-amber-900/25 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-amber-300" style={{ fontFamily: "'Georgia', serif" }}>
                Payment Method
              </h2>
              <div className="space-y-2">
                {[{ value: "cod", label: "💵 Cash on Delivery" }, { value: "online", label: "💳 Online Payment" }].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${formData.paymentMethod === opt.value ? 'border-amber-500/50 bg-amber-500/10' : 'border-amber-900/25 hover:border-amber-800/50 hover:bg-white/3'}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleInputChange} className="accent-amber-500" required />
                    <span className="text-sm text-amber-200/80">{opt.label}</span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-900/30"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;