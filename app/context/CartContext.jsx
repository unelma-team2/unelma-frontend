"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GUEST_CART_KEY = "guest_cart";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const CartContext = createContext(undefined);

// Local storage key for guest cart
const getGuestCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
};

const saveGuestCart = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const clearGuestCartStorage = () => {
  localStorage.removeItem(GUEST_CART_KEY);
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const justOrdered = typeof window !== "undefined" && sessionStorage.getItem("justOrdered");
        if (justOrdered) {
          sessionStorage.removeItem("justOrdered");
          setCartItems([]);
          return;
        }
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(GUEST_CART_KEY);
          if (saved) setCartItems(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Cart hydrate error", e);
      }
    };
    hydrate();
  }, []);

  // addToCart: merges item into cart, persists, returns Promise
  const addToCart = async (item) => {
    const qty = item.quantity ?? 1;
    setCartItems((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === item.id);
      let next;
      if (existsIndex > -1) {
        next = prev.map((p, i) =>
          i === existsIndex ? { ...p, quantity: (p.quantity || 1) + qty } : p
        );
      } else {
        next = [...prev, { ...item, quantity: qty }];
      }
      try {
        if (typeof window !== "undefined") localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    return Promise.resolve();
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try {
        if (typeof window !== "undefined") localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // updateQuantity exposed as updateQuantity to match callers
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, quantity } : p));
      try {
        if (typeof window !== "undefined") localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearCart = async ({ clearServer = true, userId = null } = {}) => {
    try {
      setCartItems([]);
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(GUEST_CART_KEY);
        } catch {}
      }
      if (clearServer && userId) {
        try {
          await axios.post(`${API_URL}/api/cart/clear`, { userId });
        } catch (err) {
          console.warn("Failed to clear server cart", err?.response?.data || err.message);
        }
      }
    } catch (e) {
      console.error("clearCart error", e);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shippingOptions,
        setShippingOptions,
        selectedShipping,
        setSelectedShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
