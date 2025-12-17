'use client';

// Working correctly for logged in users with Strapi backend

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserProfile } from "./UserContext";

const CartContext = createContext();

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export function CartProvider({ children }) {
  const { profile } = useUserProfile();

  const [cartItems, setCartItems] = useState([]);
  const [cartDocumentId, setCartDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -----------------------------------------
     1️⃣ FETCH OR CREATE CART (LOGGED-IN ONLY)
  ----------------------------------------- */
  useEffect(() => {
    if (!profile?.documentId) {
      // User logged out → clear cart state
      setCartItems([]);
      setCartDocumentId(null);
      return;
    }

    const initCart = async () => {
      setLoading(true);
      try {
        // Fetch ACTIVE cart for this user
        const res = await axios.get(
          `${API_URL}/api/carts?filters[user_profile][documentId][$eq]=${profile.documentId}&filters[cart_status][$eq]=Active`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );

        let cart = res.data.data[0];

        // Create cart if none exists
        if (!cart) {
          const createRes = await axios.post(
            `${API_URL}/api/carts`,
            {
              data: {
                user_profile: profile.documentId,
                cart_status: "Active",
                currency: "USD",
                total: 0,
              },
            },
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
          );
          cart = createRes.data.data;
        }

        setCartDocumentId(cart.documentId);
        await fetchCartItems(cart.documentId);
      } catch (err) {
        console.error("Cart init failed:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    initCart();
  }, [profile]);

  /* -----------------------------------------
     2️⃣ FETCH CART ITEMS
  ----------------------------------------- */
  const fetchCartItems = async (cartId) => {
    if (!cartId) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${cartId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      setCartItems(
        res.data.data.map(item => ({
          id: item.id,
          documentId: item.documentId,
          productId: item.product_id,
          name: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subTotal: item.subTotal,
        }))
      );
    } catch (err) {
      console.error("Fetch cart items failed:", err.response?.data || err);
    }
  };

  /* -----------------------------------------
     3️⃣ ADD TO CART
  ----------------------------------------- */
  const addToCart = async (product) => {
    if (!cartDocumentId || !profile?.documentId) return;

    const quantity = product.quantity || 1;
    const unitPrice = Number(product.unitPrice);

    try {
      const existingRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${cartDocumentId}&filters[product_id][$eq]=${product.id}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      if (existingRes.data.data.length > 0) {
        const item = existingRes.data.data[0];
        const newQty = item.quantity + quantity;

        await axios.put(
          `${API_URL}/api/cart-items/${item.documentId}`,
          {
            data: {
              quantity: newQty,
              subTotal: newQty * unitPrice,
            },
          },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      } else {
        await axios.post(
          `${API_URL}/api/cart-items`,
          {
            data: {
              cart: cartDocumentId,
              product_id: product.id,
              product_name: product.name,
              quantity,
              unitPrice,
              subTotal: quantity * unitPrice,
            },
          },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      }

      await fetchCartItems(cartDocumentId);
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err);
    }
  };

  /* -----------------------------------------
     4️⃣ UPDATE QUANTITY
  ----------------------------------------- */
  const updateQuantity = async (itemDocumentId, quantity) => {
    const item = cartItems.find(i => i.documentId === itemDocumentId);
    if (!item) return;

    const newQty = Math.max(1, quantity);

    try {
      await axios.put(
        `${API_URL}/api/cart-items/${itemDocumentId}`,
        {
          data: {
            quantity: newQty,
            subTotal: newQty * item.unitPrice,
          },
        },
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      await fetchCartItems(cartDocumentId);
    } catch (err) {
      console.error("Update quantity failed:", err.response?.data || err);
    }
  };

  /* -----------------------------------------
     5️⃣ REMOVE ITEM
  ----------------------------------------- */
  const removeFromCart = async (itemDocumentId) => {
    try {
      await axios.delete(
        `${API_URL}/api/cart-items/${itemDocumentId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      await fetchCartItems(cartDocumentId);
    } catch (err) {
      console.error("Remove item failed:", err.response?.data || err);
    }
  };

  /* -----------------------------------------
     6️⃣ CLEAR CART
  ----------------------------------------- */
  const clearCart = async () => {
    if (!cartDocumentId) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${cartDocumentId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      await Promise.all(
        res.data.data.map(item =>
          axios.delete(`${API_URL}/api/cart-items/${item.documentId}`, {
            headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
          })
        )
      );

      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err.response?.data || err);
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
        loading,
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