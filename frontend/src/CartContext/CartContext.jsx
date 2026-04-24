import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD ITEM
  const addToCart = (item, qty) => {
    setCartItems((prev) => {
      const exists = prev.find((ci) => ci._id === item._id);

      if (exists) {
        return prev.map((ci) =>
          ci._id === item._id ? { ...ci, quantity: qty } : ci
        );
      }

      return [
        ...prev,
        {
          _id: item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: qty,
        },
      ];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((ci) => ci._id !== _id));
  };

  // UPDATE QUANTITY
  const updateQuantity = (_id, qty) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci._id === _id ? { ...ci, quantity: qty } : ci
      )
    );
  };

  // CLEAR CART
  const clearCart = () => setCartItems([]);

  // TOTALS
  const totalItems = cartItems.reduce(
    (sum, ci) => sum + (ci.quantity || 0),
    0
  );

  const totalAmount = cartItems.reduce(
    (sum, ci) => sum + ci.price * ci.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);