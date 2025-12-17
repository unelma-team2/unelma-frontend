"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(undefined);

const buildKey = (item, type) => {
  if (!item) return null;
  const slug = item.slug || item.attributes?.slug;
  const id = item.id || item.attributes?.id;
  const identifier = slug || id;
  if (!identifier) return null;
  return `${type}-${identifier}`;
};

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
      const parsed = stored ? JSON.parse(stored) : [];
      const seen = new Set();
      const normalized = [];
      parsed.forEach((fav) => {
        if (!fav?.item || !fav?.type) return;
        const key = fav?.key || buildKey(fav?.item, fav?.type);
        if (!key || seen.has(key)) return;
        seen.add(key);
        normalized.push({ ...fav, key });
      });

      setFavorites(normalized);
    } catch (err) {
      console.error("Failed to load favourites:", err);
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
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

      const key = buildKey(item, type);
      if (!key) return;

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
    (keyOrItem, type) => {
      const key = typeof keyOrItem === "string" ? keyOrItem : buildKey(keyOrItem, type);
      if (!key) return;
      updateAndPersist((prev) => prev.filter((fav) => fav.key !== key));
    },
    [updateAndPersist]
  );

  const clearFavorites = useCallback(() => {
    updateAndPersist([]);
  }, [updateAndPersist]);

  const isFavorite = useCallback(
    (itemOrId, type) => {
      const key =
        typeof itemOrId === "string" || typeof itemOrId === "number"
          ? `${type}-${itemOrId}`
          : buildKey(itemOrId, type);
      if (!key) return false;
      return favorites.some((fav) => fav.key === key);
    },
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites }),
    [favorites, isFavorite, removeFavorite, toggleFavorite, clearFavorites]
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
