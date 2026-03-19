/**
 * @file src/hooks/useFavorites.js
 * @description Custom hook for managing a user's favourite property IDs.
 * Persists to localStorage so the list survives page refreshes.
 */

import { useState, useCallback } from "react";

const STORAGE_KEY = "pe_favorites";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [1, 4]; // default seed
  } catch {
    return [1, 4];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(loadFromStorage);

  const toggleFav = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage not available */
      }
      return next;
    });
  }, []);

  const isFav = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, toggleFav, isFav };
};
