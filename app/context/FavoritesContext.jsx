"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const storageKey = user ? `favorites_${user.id}` : null;

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      const stored = storageKey ? localStorage.getItem(storageKey) : null;
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error("Failed to load favourites:", err);
      setFavorites([]);
    }
  }, [storageKey, user]);

  const updateAndPersist = useCallback(
    (updater) => {
      setFavorites((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(next));
        }
        return next;
      });
    },
    [storageKey]
  );

  const toggleFavorite = useCallback(
    (item, type) => {
      if (!user) {
        alert("Please log in to save favourites.");
        return;
      }

      if (!item?.id) return;

      const key = `${type}-${item.id}`;

      updateAndPersist((prev) => {
        const exists = prev.some((fav) => fav.key === key);
        return exists
          ? prev.filter((fav) => fav.key !== key)
          : [...prev, { key, type, item }];
      });
    },
    [updateAndPersist, user]
  );

  const removeFavorite = useCallback(
    (key) => {
      updateAndPersist((prev) => prev.filter((fav) => fav.key !== key));
    },
    [updateAndPersist]
  );

  const isFavorite = useCallback(
    (id, type) => favorites.some((fav) => fav.key === `${type}-${id}`),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, removeFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
