import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  createContext,
} from "react";
import axios from "axios";

const CartContext = createContext();

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "HYDRATE_CART":
      return action.payload;
    case "ADD_ITEM": {
      const { _id, name, price, imageUrl, quantity } = action.payload;
      const exists = state.find((ci) => ci._id === _id);
      if (exists) {
        return state.map((ci) => (ci._id === _id ? { ...ci, quantity } : ci));
      }
      return [...state, { _id, name, price, imageUrl, quantity }];
    }
    case "REMOVE_ITEM":
      return state.filter((ci) => ci._id !== action.payload);
    case "UPDATE_ITEM": {
      const { _id, quantity } = action.payload;
      return state.map((ci) => (ci._id === _id ? { ...ci, quantity } : ci));
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Load from localStorage
const initializer = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = useCallback(async (item, qty) => {
    const cartItem = {
      _id: item._id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: qty,
    };
    dispatch({ type: "ADD_ITEM", payload: cartItem });
  }, []);

  const removeFromCart = useCallback((_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  }, []);

  const updateQuantity = useCallback((_id, qty) => {
    dispatch({ type: "UPDATE_ITEM", payload: { _id, quantity: qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, ci) => sum + (ci.quantity || 0), 0),
    [cartItems]
  );

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),
    [cartItems]
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
