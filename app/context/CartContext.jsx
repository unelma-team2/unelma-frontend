'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useUserProfile } from "./UserContext";
import axios from "axios";

const CartContext = createContext();
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
console.log("STRAPI_TOKEN", STRAPI_TOKEN);

export function CartProvider({ children }) {
  const { profile } = useUserProfile();
  const [cartItems, setCartItems] = useState([]);
  const [userCartId, setUserCartId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  useEffect(() => {
    if (!profile?.id) return;

    const fetchOrCreateCart = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/carts?filters[user_profile][id][$eq]=${profile.id}`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );

        if (res.data.data.length > 0) {
          setUserCartId(res.data.data[0].id);

          const items = res.data.data[0].attributes?.cart_items?.data?.map(
            (item) => ({
              id: item.attributes.product_id,
              name: item.attributes.product_name,
              quantity: item.attributes.quantity,
              unitPrice: item.attributes.unitPrice,
              subTotal: item.attributes.subTotal,
            })
          ) || [];

          setCartItems(items);
        } else {
          const createRes = await axios.post(
            `${API_URL}/api/carts`,
            { data: { user_profile: profile.id, total: "0" } },
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
          );
          setUserCartId(createRes.data.data.id);
        }
      } catch (err) {
        console.error("Failed to fetch/create cart:", err.response?.data || err);
      }
    };

    fetchOrCreateCart();
  }, [profile]);

  const addToCart = async (product) => {
    if (!userCartId) return;

    const quantity = product.quantity || 1;
    const unitPrice = Number(product.unitPrice || 0);
    const subTotal = (quantity * unitPrice).toFixed(2);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, subTotal }
            : item
        );
      }
      return [...prev, { ...product, quantity, unitPrice, subTotal }];
    });

    try {
      await axios.post(
        `${API_URL}/api/cart-items`,
        {
          data: {
            product_name: product.name,
            product_id: product.id,
            quantity,
            unitPrice,
            subTotal,
            cart: userCartId,
          },
        },
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
    } catch (err) {
      console.error("Failed to add to backend cart:", err.response?.data || err);
    }
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: Math.max(1, item.quantity + amount),
            subTotal: ((item.quantity + amount) * item.unitPrice).toFixed(2),
          }
          : item
      )
    );
  };

  const removeFromCart = async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

    if (!userCartId) return;
    try {
      const itemsRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}&filters[product_id][$eq]=${productId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      if (itemsRes.data.data.length > 0) {
        const itemId = itemsRes.data.data[0].id;
        await axios.delete(`${API_URL}/api/cart-items/${itemId}`, {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        });
      }
    } catch (err) {
      console.error("Failed to remove from backend cart:", err.response?.data || err);
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (!userCartId) return;
    try {
      const itemsRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      for (const item of itemsRes.data.data) {
        await axios.delete(`${API_URL}/api/cart-items/${item.id}`, {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        });
      }
    } catch (err) {
      console.error("Failed to clear backend cart:", err.response?.data || err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        userCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
