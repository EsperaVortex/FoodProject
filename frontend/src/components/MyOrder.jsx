import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi'
import axios from 'axios'

const statusStyles = {
  processing: { color: 'text-amber-400', label: 'Processing', icon: <FiClock /> },
  outForDelivery: { color: 'text-blue-400', label: 'Out for Delivery', icon: <FiTruck /> },
  delivered: { color: 'text-green-400', label: 'Delivered', icon: <FiCheckCircle /> },
  pending: { color: 'text-yellow-400', label: 'Payment Pending', icon: <FiClock /> },
  succeeded: { color: 'text-green-400', label: 'Completed', icon: <FiCheckCircle /> },
}

const MyOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get('http://localhost:4000/api/orders', {
      params: { email: user?.email },
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(res => {
        setOrders(res.data.map(order => ({
          ...order,
          createdAt: new Date(order.createdAt).toLocaleString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
          paymentStatus: order.paymentStatus?.toLowerCase() || 'pending'
        })))
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false))
  }, [user?.email])

  if (error) return (
    <div className="min-h-screen bg-[#1a0f07] flex items-center justify-center flex-col gap-4">
      <p className="text-red-400">{error}</p>
      <button onClick={() => window.location.reload()} className="text-amber-400 hover:text-amber-300 text-sm">
        Try Again
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1a0f07] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm">
            <FiArrowLeft /> Back to Home
          </Link>
          <span className="text-amber-400/50 text-xs">{user?.email}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Order <span className="text-amber-400">History</span>
        </h1>

        {loading ? (
          <p className="text-center text-amber-300 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-amber-200/40 text-sm">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-900/30 text-amber-400 text-xs uppercase tracking-wider">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const total = order.total ?? order.items.reduce(
                    (sum, i) => sum + i.item.price * i.quantity, 0
                  )
                  const orderStatus = statusStyles[order.status] || statusStyles.processing
                  const payStatus = statusStyles[order.paymentStatus] || statusStyles.pending

                  return (
                    <tr key={order._id} className="border-b border-amber-900/20 hover:bg-white/3 transition-colors">

                      <td className="p-4 text-amber-200/60 font-mono">#{order._id?.slice(-8)}</td>

                      <td className="p-4">
                        <p className="text-amber-100">{order.firstName} {order.lastName}</p>
                        <p className="text-amber-400/50 text-xs">{order.phone}</p>
                      </td>

                      <td className="p-4 text-amber-100/70 max-w-[160px]">
                        {order.address}, {order.city}
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {order.items.map((entry, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <img
                                src={
                                    entry.item.imageUrl?.startsWith('http')
                                    ? entry.item.imageUrl
                                    : `http://localhost:4000${entry.item.imageUrl}`
                                }
                                alt={entry.item.name}
                                className="w-9 h-9 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-amber-100/80">{entry.item.name}</p>
                                <p className="text-amber-400/50 text-xs">Rs {entry.item.price} × {entry.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-amber-300 font-semibold">
                        Rs {total.toFixed(0)}
                      </td>

                      <td className="p-4">
                        <p className="text-amber-200/70 capitalize">{order.paymentMethod}</p>
                        <div className={`flex items-center gap-1 text-xs mt-1 ${payStatus.color}`}>
                          {payStatus.icon}
                          <span>{payStatus.label}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className={`flex items-center gap-1 text-xs font-medium ${orderStatus.color}`}>
                          {orderStatus.icon}
                          <span>{orderStatus.label}</span>
                        </div>
                      </td>

                      <td className="p-4 text-amber-200/50 text-xs whitespace-nowrap">
                        {order.createdAt}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrder