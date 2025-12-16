'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useUserProfile } from "./UserContext";
import axios from "axios";

const CartContext = createContext();
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export function CartProvider({ children }) {
  const { profile } = useUserProfile();
  const [cartItems, setCartItems] = useState([]);
  const [userCartId, setUserCartId] = useState(null);

  useEffect(() => {
    if (!profile?.id) return;

    const fetchOrCreateCart = async () => {
      try {
        // 1️⃣ Check if cart exists
        const res = await axios.get(
          `${API_URL}/api/carts?filters[user_profile][id][$eq]=${profile.id}`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );

        let cart;
        if (res.data.data.length > 0) {
          cart = res.data.data[0];
        } else {
          // 2️⃣ Create cart
          const createRes = await axios.post(
            `${API_URL}/api/carts`,
            { data: { user_profile: profile.id, total: 0, status: "Active" } },
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
          );
          cart = createRes.data.data;
        }

        setUserCartId(cart.id);

        // 3️⃣ Fetch cart items
        await fetchCartItems(cart.id);
      } catch (err) {
        console.error("Failed to fetch/create cart:", err.response?.data || err);
      }
    };

    fetchOrCreateCart();
  }, [profile]);

  const fetchCartItems = async (cartId = userCartId) => {
    if (!cartId) return;
  
    try {
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${cartId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
  
      const items = res.data.data.map((item) => ({
        id: item.id,
        productId: item.product_id || null,
        name: item.product_name || "Unknown Product",
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
        subTotal: item.subTotal || (item.quantity || 1) * (item.unitPrice || 0),
      }));
  
      setCartItems(items);
    } catch (err) {
      console.error("Failed to fetch cart items:", err.response?.data || err);
    }
  };
  
  const addToCart = async (product) => {
    if (!userCartId) return;
    const quantityToAdd = product.quantity || 1;
    const unitPrice = Number(product.unitPrice || 0);

    try {
      // Check if product already exists
      const existingRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}&filters[product][id][$eq]=${product.id}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      if (existingRes.data.data.length > 0) {
        const item = existingRes.data.data[0];
        const newQuantity = item.attributes.quantity + quantityToAdd;
        const newSubTotal = newQuantity * unitPrice;

        await axios.put(
          `${API_URL}/api/cart-items/${item.id}`,
          { data: { quantity: newQuantity, subTotal: newSubTotal } },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      } else {
        await axios.post(
          `${API_URL}/api/cart-items`,
          {
            data: {
              cart: userCartId,
              product: product.id, // link product relation
              quantity: quantityToAdd,
              unitPrice,
              subTotal: quantityToAdd * unitPrice,
            },
          },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      }

      await fetchCartItems(); // refresh
    } catch (err) {
      console.error("Failed to add/update cart item:", err.response?.data || err);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    const updatedQuantity = Math.max(1, newQuantity);
    const updatedSubTotal = updatedQuantity * item.unitPrice;

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === cartItemId ? { ...i, quantity: updatedQuantity, subTotal: updatedSubTotal } : i
      )
    );

    try {
      await axios.put(
        `${API_URL}/api/cart-items/${cartItemId}`,
        { data: { quantity: updatedQuantity, subTotal: updatedSubTotal } },
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
    } catch (err) {
      console.error("Failed to update quantity, rolling back:", err.response?.data || err);
      fetchCartItems();
    }
  };

  const removeFromCart = async (cartItemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));

    try {
      await axios.delete(`${API_URL}/api/cart-items/${cartItemId}`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      });
    } catch (err) {
      console.error("Failed to remove item, rolling back:", err.response?.data || err);
      fetchCartItems();
    }
  };

  const clearCart = async () => {
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

      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err.response?.data || err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, userCartId }}
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
