"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUserProfile } from "./UserContext";

const CartContext = createContext();

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Local storage key for guest cart
const GUEST_CART_KEY = "guest_cart";

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
  const { profile } = useUserProfile();

  const [cartItems, setCartItems] = useState([]);
  const [cartDocumentId, setCartDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Exposed helper: merge guest cart (localStorage) into server cart (Strapi).
  // Hoisted so it can be called from checkout/login flows and exposed in provider value.
  const mergeGuestCartToServer = async (serverCartDocumentId) => {
    try {
      const guest = getGuestCart();
      if (!guest || !guest.length) return false;

      const existingRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${serverCartDocumentId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
      const serverItems = existingRes.data.data || [];
      const serverMap = new Map(
        serverItems.map((i) => [String(i.product_id ?? i.productId ?? i.id), i])
      );

      await Promise.all(
        guest.map((g) => {
          const existing = serverMap.get(String(g.productId));
          const unitPrice = Number(g.unitPrice || 0);
          if (existing) {
            const newQty = (existing.quantity || 0) + (g.quantity || 0);
            return axios.put(
              `${API_URL}/api/cart-items/${existing.documentId}`,
              { data: { quantity: newQty, subTotal: newQty * unitPrice } },
              { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
            );
          }

          return axios.post(
            `${API_URL}/api/cart-items`,
            {
              data: {
                cart: serverCartDocumentId,
                product_id: g.productId,
                product_name: g.name,
                quantity: g.quantity,
                unitPrice,
                subTotal: (g.quantity || 0) * unitPrice,
              },
            },
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
          );
        })
      );

      clearGuestCartStorage();
      await fetchCartItems(serverCartDocumentId);
      return true;
    } catch (err) {
      console.error(
        "Guest -> server cart merge failed:",
        err?.response?.data || err
      );
      return false;
    }
  };

  // remember previous profile so we can detect logout transitions
  const prevProfileRef = useRef(profile);

  // Persist in-memory cart to guest localStorage when user logs out
  useEffect(() => {
    const prev = prevProfileRef.current;
    // if previously logged in (had documentId) and now not, persist cartItems
    if (prev?.documentId && !profile?.documentId) {
      try {
        if (Array.isArray(cartItems) && cartItems.length) {
          const toSave = cartItems.map((i) => ({
            productId: i.productId ?? i.product_id ?? i.id,
            name: i.name ?? i.product_name ?? "",
            unitPrice: Number(i.unitPrice ?? 0),
            quantity: i.quantity ?? 1,
            subTotal: (i.quantity ?? 1) * Number(i.unitPrice ?? 0),
          }));
          saveGuestCart(toSave);
          console.debug(
            "CartContext: persisted cart to guest localStorage on logout",
            toSave
          );
        }
      } catch (e) {
        console.warn("CartContext: failed to persist guest cart on logout", e);
      }
    }
    prevProfileRef.current = profile;
  }, [profile, cartItems]);

  /* -----------------------------------------
     1️⃣ FETCH OR CREATE CART (LOGGED-IN ONLY)
  ----------------------------------------- */
  useEffect(() => {
    if (!profile?.documentId) {
      // load guest cart on initialization for anonymous user
      setCartItems(getGuestCart());
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
        // DO NOT auto-merge guest cart on login. Defer merging until checkout.
        // If there are no guest items, fetch server items now so UI shows server cart.
        const guest = getGuestCart();
        if (!guest || !guest.length) {
          await fetchCartItems(cart.documentId);
        }
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
  // optional prevOrderArray: array of items (snapshot) used to preserve order after server refresh
  const fetchCartItems = async (cartId, prevOrderArray = []) => {
    if (!cartId) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${cartId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      const serverItems = res.data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        productId: item.product_id,
        name: item.product_name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subTotal: item.subTotal,
      }));

      // preserve previous order if available (match by documentId/productId/id)
      if (Array.isArray(prevOrderArray) && prevOrderArray.length) {
        const prevOrder = prevOrderArray.map((i) =>
          String(i.documentId ?? i.productId ?? i.id)
        );
        const orderIndex = new Map(prevOrder.map((id, idx) => [id, idx]));
        serverItems.sort((a, b) => {
          const ai = orderIndex.has(String(a.documentId ?? a.productId ?? a.id))
            ? orderIndex.get(String(a.documentId ?? a.productId ?? a.id))
            : Number.MAX_SAFE_INTEGER;
          const bi = orderIndex.has(String(b.documentId ?? b.productId ?? b.id))
            ? orderIndex.get(String(b.documentId ?? b.productId ?? b.id))
            : Number.MAX_SAFE_INTEGER;
          return ai - bi;
        });
      }

      setCartItems(serverItems);
    } catch (err) {
      console.error("Fetch cart items failed:", err.response?.data || err);
    }
  };

  /* -----------------------------------------
     3️⃣ ADD TO CART
  ----------------------------------------- */
  const addToCart = async (product) => {
    const quantity = product.quantity || 1;
    const unitPrice = Number(product.unitPrice);

    if (!profile?.documentId) {
      const items = getGuestCart();
      const existing = items.find((i) => i.productId === product.id);

      if (existing) {
        existing.quantity += quantity;
        existing.subTotal = existing.quantity * existing.unitPrice;
      } else {
        items.push({
          productId: product.id,
          name: product.name,
          unitPrice,
          quantity,
          subTotal: quantity * unitPrice,
        });
      }

      saveGuestCart(items);
      setCartItems(items);
      return;
    }

    if (!cartDocumentId) return;

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
  const updateQuantity = async (itemId, quantity) => {
    const newQty = Math.max(1, quantity);

    // 🟡 Guest
    if (!profile?.documentId) {
      const items = getGuestCart().map((item) =>
        item.productId === itemId
          ? { ...item, quantity: newQty, subTotal: newQty * item.unitPrice }
          : item
      );

      saveGuestCart(items);
      setCartItems(items);
      return;
    }

    const prevItems = cartItems.slice(); // snapshot to preserve order
    const item = prevItems.find((i) => String(i.documentId) === String(itemId));
    if (!item) return;

    // optimistic update (preserve array order using map)
    const updatedOptimistic = prevItems.map((it) =>
      String(it.documentId) === String(itemId)
        ? { ...it, quantity: newQty, subTotal: newQty * it.unitPrice }
        : it
    );
    setCartItems(updatedOptimistic);

    try {
      await axios.put(
        `${API_URL}/api/cart-items/${itemId}`,
        {
          data: {
            quantity: newQty,
            subTotal: newQty * item.unitPrice,
          },
        },
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      // re-fetch server state but preserve previous order using prevItems snapshot
      await fetchCartItems(cartDocumentId, prevItems);
    } catch (err) {
      console.error("Update quantity failed:", err.response?.data || err);
      // revert optimistic update on failure
      setCartItems(prevItems);
    }
  };

  /* -----------------------------------------
     5️⃣ REMOVE ITEM
  ----------------------------------------- */
  const removeFromCart = async (id) => {
    // 🟡 Guest
    if (!profile?.documentId) {
      const items = getGuestCart().filter((i) => i.productId !== id);
      saveGuestCart(items);
      setCartItems(items);
      return;
    }

    await axios.delete(`${API_URL}/api/cart-items/${id}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    });

    await fetchCartItems(cartDocumentId);
  };

  /* -----------------------------------------
     6️⃣ CLEAR CART
  ----------------------------------------- */
  const clearCart = async () => {
    if (!profile?.documentId) {
      clearGuestCartStorage();
      setCartItems([]);
      return;
    }

    if (!cartDocumentId) return;

    const res = await axios.get(
      `${API_URL}/api/cart-items?filters[cart][documentId][$eq]=${cartDocumentId}`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
    );

    await Promise.all(
      res.data.data.map((item) =>
        axios.delete(`${API_URL}/api/cart-items/${item.documentId}`, {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        })
      )
    );

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartDocumentId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        mergeGuestCartToServer, // expose merge function to be called at checkout
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
