/*
 * THIS FILE IS NO LONGER USED
 *
 * The application has been updated to use direct Google Authentication
 * instead of Firebase Authentication. See the googleAuth.js file for
 * the current implementation.
 *
 * This file is kept for reference purposes only.
 */

/*
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "country-explorer-xxxxx.firebaseapp.com",
  projectId: "country-explorer-xxxxx",
  storageBucket: "country-explorer-xxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Signed out successfully");
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export { auth };
*/

// Creating dummy exports to prevent import errors in case some files still reference this
export const auth = null;
export const signInWithGoogle = async () => {
  console.warn(
    "Firebase authentication is no longer used. Use googleAuth.js instead."
  );
  return null;
};
export const logOut = async () => {
  console.warn(
    "Firebase authentication is no longer used. Use googleAuth.js instead."
  );
};
