import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Create favorites context
const FavoritesContext = createContext();

// Custom hook for using favorites context
export const useFavorites = () => useContext(FavoritesContext);

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const storageKey = `favorites_${currentUser.uid}`;
      const savedFavorites = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );
      setFavorites(savedFavorites);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  // Add country to favorites
  const addFavorite = (country) => {
    if (!currentUser) return;

    const storageKey = `favorites_${currentUser.uid}`;

    // Check if already in favorites
    if (!favorites.some((fav) => fav.cca3 === country.cca3)) {
      const { name, flags, capital, population, region, cca3 } = country;
      const newFavorite = { name, flags, capital, population, region, cca3 };
      const updatedFavorites = [...favorites, newFavorite];

      setFavorites(updatedFavorites);
      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
    }
  };

  // Remove country from favorites
  const removeFavorite = (countryCode) => {
    if (!currentUser) return;

    const storageKey = `favorites_${currentUser.uid}`;
    const updatedFavorites = favorites.filter(
      (country) => country.cca3 !== countryCode
    );

    setFavorites(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
  };

  // Check if country is in favorites
  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  // Toggle favorite status
  const toggleFavorite = (country) => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
