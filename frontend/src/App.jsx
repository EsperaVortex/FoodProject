import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PrivateRoute from './components/PrivateRoute'
import VerifyPaymentPage from './pages/VerifyPaymentPage'
import CheckoutPage from './pages/CheckoutPage'
import MyOrderPage from './pages/MyOrderPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/menu' element={<Menu />} />

      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />

      {/* payment verification */}
      <Route path='/myorder/verify' element={<VerifyPaymentPage />}></Route>

      <Route path='/cart' element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />

      <Route path='/checkout' element={<PrivateRoute>
        <CheckoutPage />
      </PrivateRoute>}>
      </Route>
      <Route path='/myorder' element={<PrivateRoute><MyOrderPage /></PrivateRoute>}></Route>
    </Routes>
  )
}

export default App
