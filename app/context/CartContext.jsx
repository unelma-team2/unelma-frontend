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

  // Fetch or create a cart for the user
  useEffect(() => {
    if (!profile?.id) return;

    const fetchOrCreateCart = async () => {
      try {
        // 1️⃣ Fetch user's cart
        const res = await axios.get(
          `${API_URL}/api/carts?filters[user_profile][id][$eq]=${profile.id}`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );

        let cart;
        if (res.data.data.length > 0) {
          cart = res.data.data[0];
        } else {
          // 2️⃣ Create cart if not exists
          const createRes = await axios.post(
            `${API_URL}/api/carts`,
            { data: { user_profile: profile.id, total: 0, status: "Active" } },
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
          );
          cart = createRes.data.data;
        }

        setUserCartId(cart.id);
        console.log("User cart ID:", cart.id);

        // 3️⃣ Fetch cart items separately
        const itemsRes = await axios.get(
          `${API_URL}/api/cart-items?filters[cart][id][$eq]=${cart.id}`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );

        const items = itemsRes.data.data.map((item) => ({
          backendId: item.id,
          id: item.product_id,
          name: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subTotal: item.subTotal,
        }));

        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch/create cart:", err.response?.data || err);
      }
    };

    fetchOrCreateCart();
  }, [profile]);

  // Refresh cart items
  const fetchCartItems = async () => {
    if (!userCartId) return;
    try {
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      const items = res.data.data.map((item) => ({
        backendId: item.id,
        id: item.product_id,
        name: item.product_name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subTotal: item.subTotal,
      }));

      setCartItems(items);
    } catch (err) {
      console.error("Failed to fetch cart items:", err.response?.data || err);
    }
  };

  // Add or update a cart item
  const addToCart = async (product) => {
    if (!userCartId) return;

    const quantityToAdd = product.quantity || 1;
    const unitPrice = Number(product.unitPrice || 0);

    try {
      // Check if product already exists
      const existingRes = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}&filters[product_id][$eq]=${product.id}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );

      if (existingRes.data.data.length > 0) {
        const item = existingRes.data.data[0];
        const newQuantity = item.quantity + quantityToAdd;
        const newSubTotal = newQuantity * unitPrice;

        // ✅ Use put for updating
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
              product_id: product.id,
              product_name: product.name,
              quantity: quantityToAdd,
              unitPrice,
              subTotal: quantityToAdd * unitPrice,
            },
          },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      }

      await fetchCartItems(); // Refresh after add/update
    } catch (err) {
      console.error("Failed to add/update cart item:", err.response?.data || err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
  
    const updatedQuantity = Math.max(1, newQuantity);
    const updatedSubTotal = updatedQuantity * item.unitPrice;
  
    // Optimistic frontend update
    setCartItems(prev =>
      prev.map(i =>
        i.id === productId ? { ...i, quantity: updatedQuantity, subTotal: updatedSubTotal } : i
      )
    );
  
    try {
      // Fetch backend ID dynamically
      const res = await axios.get(
        `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}&filters[product_id][$eq]=${productId}`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
  
      if (res.data.data.length === 0) {
        console.error("Backend cart-item not found for productId:", productId);
        fetchCartItems();
        return;
      }
  
      const backendItemId = res.data.data[0].id; // use the correct backend ID
      console.log("Updating backend itemId:", backendItemId, "newQuantity:", updatedQuantity);
  
      await axios.put(
        `${API_URL}/api/cart-items/${backendItemId}`,
        { data: { quantity: updatedQuantity, subTotal: updatedSubTotal } },
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
      );
  
      console.log(`Quantity updated successfully for productId ${productId}`);
    } catch (err) {
      console.error("Failed to update quantity in backend, rolling back:", err.response?.data || err);
      fetchCartItems();
    }
  };
  



  // const updateQuantity = async (productId, amount) => {
  //   console.log("cart items:",cartItems);
  //   const item = cartItems.find(i => i.id === productId);
  //   if (!item) {
  //     console.error("Item not found in cartItems for productId:", productId);
  //     return;
  //   }
  //   console.log("Updating item backendId:", item.backendId);
  
  //   const newQuantity = Math.max(1, item.quantity + amount);
  //   const newSubTotal = newQuantity * item.unitPrice;

  //   console.log("put request to backendId:", item.backendId, "newQuantity:", newQuantity);

  
  //   try {
  //     await axios.put(
  //       `${API_URL}/api/cart-items/${item.backendId}`,
  //       {
  //         data: {
  //           cart: userCartId,          // cart relation
  //           product_id: item.id,
  //           product_name: item.name,
  //           quantity: newQuantity,
  //           unitPrice: item.unitPrice,
  //           subTotal: newSubTotal,
  //         }
  //       },
  //       { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
  //     );

  //     console.log("after put request to backendId:", item.backendId, "newQuantity:", newQuantity);


  
  //     // Update frontend state
  //     setCartItems(prev =>
  //       prev.map(i =>
  //         i.id === productId ? { ...i, quantity: newQuantity, subTotal: newSubTotal } : i
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Failed to update quantity:", err.response?.data || err);
  //   }
  // };

  // Remove an item
  // const removeFromCart = async (productId) => {
  //   try {
  //     const itemsRes = await axios.get(
  //       `${API_URL}/api/cart-items?filters[cart][id][$eq]=${userCartId}&filters[product_id][$eq]=${productId}`,
  //       { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
  //     );

  //     if (itemsRes.data.data.length > 0) {
  //       const itemId = itemsRes.data.data[0].id;
  //       await axios.delete(`${API_URL}/api/cart-items/${itemId}`, {
  //         headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  //       });
  //     }

  //     // Remove from frontend state
  //     setCartItems((prev) => prev.filter((item) => item.id !== productId));
  //   } catch (err) {
  //     console.error("Failed to remove cart item:", err.response?.data || err);
  //   }
  // };

  // Remove item from cart
const removeFromCart = async (productId) => {
  const item = cartItems.find(i => i.id === productId);
  if (!item) {
    console.error("Cart item not found for productId:", productId);
    return;
  }

  // Optimistically remove from frontend
  setCartItems(prev => prev.filter(i => i.id !== productId));

  try {
    // Remove from backend using backendId
    await axios.delete(`${API_URL}/api/cart-items/${item.backendId}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    console.log(`Removed productId ${productId} from cart`);
  } catch (err) {
    console.error("Failed to remove item from backend, rolling back:", err.response?.data || err);
    // Rollback by refetching cart items
    fetchCartItems();
  }
};

  // Clear all items
  const clearCart = async () => {
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
