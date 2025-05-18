// Google Authentication Service
// This file provides authentication services using Google Identity Services directly

// Your Google Client ID from Google Cloud Console
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

// Auth state change listeners
let authChangeListeners = [];

// User data storage
let currentUser = null;

// Load the Google Identity Services API
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector("script#google-identity-services")) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.id = "google-identity-services";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity Services"));

    // Append to document
    document.head.appendChild(script);
  });
};

// Initialize Google Authentication
export const initializeGoogleAuth = async () => {
  try {
    // Load the Google Identity Services script
    await loadGoogleScript();

    // Check if the user was previously signed in
    const userData = localStorage.getItem("countryExplore_user");
    if (userData) {
      currentUser = JSON.parse(userData);
      notifyAuthStateChanged();
    }

    console.log("Google Auth initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing Google Auth:", error);
    return false;
  }
};

// Sign in with Google
export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error("Google Identity Services not loaded"));
      return;
    }

    const handleCredentialResponse = (response) => {
      // Parse the JWT token
      const token = response.credential;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const { sub, email, name, picture } = JSON.parse(jsonPayload);

      // Create user object
      const user = {
        uid: sub,
        email,
        displayName: name,
        photoURL: picture,
        // Include token if you need it for API calls
        idToken: token,
      };

      // Store user in localStorage for persistence
      localStorage.setItem("countryExplore_user", JSON.stringify(user));

      // Update current user and notify listeners
      currentUser = user;
      notifyAuthStateChanged();

      resolve(user);
    };

    // Configure and display Google Sign-In button
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Prompt the One Tap UI
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // If One Tap is not displayed or skipped, use regular popup
        window.google.accounts.oauth2
          .initCodeClient({
            client_id: CLIENT_ID,
            scope: "profile email",
            callback: (response) => {
              if (response.error) {
                reject(new Error(`Authentication error: ${response.error}`));
              }

              // If using auth code flow, you'd exchange this for tokens
              // For simplicity, we're using the implicit flow with the JWT above
            },
          })
          .requestCode();
      }
    });
  });
};

// Sign out
export const signOut = () => {
  return new Promise((resolve) => {
    // Clear user data from storage
    localStorage.removeItem("countryExplore_user");

    // Reset current user and notify listeners
    currentUser = null;
    notifyAuthStateChanged();

    // If using Google Identity Services latest version:
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    resolve();
  });
};

// Get the current user
export const getCurrentUser = () => {
  return currentUser;
};

// Add auth state change listener
export const onAuthStateChanged = (callback) => {
  authChangeListeners.push(callback);

  // Immediately invoke with current state
  callback(currentUser);

  // Return unsubscribe function
  return () => {
    authChangeListeners = authChangeListeners.filter(
      (listener) => listener !== callback
    );
  };
};

// Notify all listeners of auth state change
const notifyAuthStateChanged = () => {
  authChangeListeners.forEach((callback) => callback(currentUser));
};
