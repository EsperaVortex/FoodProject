import React, { useEffect, useState } from 'react';
import { GiChefToque } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    FiHome, FiBook, FiStar, FiPhone,
    FiShoppingCart, FiMenu, FiX,
    FiKey, FiLogOut, FiPackage
} from 'react-icons/fi';
import { useCart } from '../CartContext/CartContext';
import Login from './Login';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { totalItems } = useCart();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('loginData')));

    useEffect(() => {
        setShowLoginModal(location.pathname === '/login');
        setIsAuthenticated(Boolean(localStorage.getItem('loginData')));
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
        setIsAuthenticated(true);
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setIsAuthenticated(false);
    };

    const navLinks = [
        { name: 'Home', to: '/', icon: <FiHome /> },
        { name: 'Menu', to: '/menu', icon: <FiBook /> },
        { name: 'About', to: '/about', icon: <FiStar /> },
        { name: 'Contact', to: '/contact', icon: <FiPhone /> },
        ...(isAuthenticated ? [{ name: 'My Order', to: '/myOrder', icon: <FiPackage /> }] : [])
    ];

    return (
        <>
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#1a0f07]/95 backdrop-blur-md shadow-2xl shadow-black/40 border-b border-amber-900/30'
                    : 'bg-[#1a0f07] border-b border-amber-900/20'
            }`}>
                {/* Top accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-[68px]">

                        {/* Logo */}
                        <NavLink to="/" className="flex items-center gap-2.5 group">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md group-hover:bg-amber-500/30 transition-all duration-300" />
                                <GiChefToque className="relative text-3xl text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                            </div>
                            <span
                                className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Mitho-Munch
                            </span>
                        </NavLink>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-amber-800/30 border border-amber-700/30 text-amber-400 hover:bg-amber-700/40 hover:text-amber-300 transition-all duration-200"
                        >
                            {isOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
                        </button>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-amber-500/15 text-amber-300 border border-amber-600/30'
                                                : 'text-amber-200/60 hover:text-amber-300 hover:bg-amber-800/30'
                                        }`
                                    }
                                >
                                    <span className="text-base">{link.icon}</span>
                                    <span>{link.name}</span>
                                </NavLink>
                            ))}

                            {/* Divider */}
                            <div className="w-px h-6 bg-amber-800/50 mx-2" />

                            {/* Cart */}
                            <NavLink
                                to="/cart"
                                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-amber-300/70 hover:text-amber-300 hover:bg-amber-800/30 border border-transparent hover:border-amber-700/30 transition-all duration-200 text-xl"
                            >
                                <FiShoppingCart />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-amber-400 to-amber-600 text-[#1a0f07] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-amber-900/50">
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>

                            {/* Auth */}
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="ml-1 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-amber-200/80 hover:text-amber-300 bg-amber-900/30 hover:bg-amber-800/50 border border-amber-800/40 hover:border-amber-700/50 transition-all duration-200"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="ml-1 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 transition-all duration-200"
                                >
                                    <FiKey />
                                    <span>Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pb-4 pt-1 space-y-1 border-t border-amber-900/30">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-amber-500/15 text-amber-300 border border-amber-600/30'
                                            : 'text-amber-200/70 hover:bg-amber-800/30 hover:text-amber-300'
                                    }`
                                }
                            >
                                <span className="text-base">{link.icon}</span>
                                <span>{link.name}</span>
                            </NavLink>
                        ))}

                        <NavLink
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-amber-200/70 hover:bg-amber-800/30 hover:text-amber-300 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <FiShoppingCart className="text-base" />
                                <span>Cart</span>
                            </div>
                            {totalItems > 0 && (
                                <span className="bg-gradient-to-br from-amber-400 to-amber-600 text-[#1a0f07] text-xs font-black px-2 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>

                        <div className="pt-1">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-amber-200/80 bg-amber-900/30 border border-amber-800/40 hover:bg-amber-800/50 transition-all duration-200"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => { navigate('/login'); setIsOpen(false); }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#1a0f07] bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-900/30 transition-all duration-200"
                                >
                                    <FiKey />
                                    <span>Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a0f07] rounded-2xl p-6 w-full max-w-sm border border-amber-800/40 shadow-2xl shadow-black/60 relative">
                        {/* top glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                        <button
                            onClick={() => navigate('/')}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-amber-500/60 hover:text-amber-300 hover:bg-amber-800/30 transition-all text-xl"
                        >
                            <FiX />
                        </button>
                        <h2 className="text-lg font-black text-center mb-5 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent"
                            style={{ fontFamily: "'Georgia', serif" }}>
                            Welcome Back
                        </h2>
                        <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;