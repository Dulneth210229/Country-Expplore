import React, { createContext, useState, useEffect, useContext } from "react";
import {
  initializeGoogleAuth,
  signInWithGoogle as googleSignIn,
  signOut as googleSignOut,
  onAuthStateChanged,
  getCurrentUser,
} from "../services/googleAuth";

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize Google Auth and listen for auth state changes
  useEffect(() => {
    const initAuth = async () => {
      await initializeGoogleAuth();
      setCurrentUser(getCurrentUser());
      setLoading(false);
    };

    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    initAuth();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Google sign in
  const login = async () => {
    try {
      const user = await googleSignIn();
      return user;
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await googleSignOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed: ", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
