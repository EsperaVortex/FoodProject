import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const contactInfo = [
  { label: 'Address', value: 'Chaysal, Lalitpur' },
  { label: 'Phone', value: '+977 9868844425' },
  { label: 'Email', value: 'mithomunch@gmail.com' },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', query: ''
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message submitted successfully!')
    setFormData({ name: '', phone: '', email: '', address: '', query: '' })
  }

  return (
    <div className="min-h-screen bg-[#1b120b] text-white py-16 px-4 font-[Poppins]">
      <Toaster position="top-right" toastOptions={{ style: { background: '#000', color: '#fff' } }} />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">
          Connect With Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map(({ label, value }) => (
              <div key={label} className="bg-white/5 border border-amber-500/30 rounded-xl p-5">
                <p className="text-amber-400 text-sm font-medium mb-1">{label}</p>
                <p className="text-amber-100 text-lg">{value}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 border border-amber-500/20 rounded-xl p-6 space-y-4">
            {[
              { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
              { label: 'Address', name: 'address', type: 'text', placeholder: 'Your address' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-amber-100 text-sm mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-2.5 bg-white/10 border border-amber-500/20 rounded-lg text-amber-50 placeholder-amber-200/50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-amber-100 text-sm mb-1">Your Query</label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="Type your message..."
                rows="4"
                required
                className="w-full px-4 py-2.5 bg-white/10 border border-amber-500/20 rounded-lg text-amber-50 placeholder-amber-200/50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact