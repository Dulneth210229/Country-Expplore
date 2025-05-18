# Country Explorer - Firebase Setup Script
# This script helps you set up your Firebase configuration

echo "Setting up Firebase Configuration for Country Explorer"
echo "----------------------------------------------------"
echo ""
echo "Please create a Firebase project at https://console.firebase.google.com/"
echo "Enable Google authentication and get your config values"
echo ""
echo "Enter your Firebase configuration values:"

read -p "API Key: " apiKey
read -p "Auth Domain: " authDomain
read -p "Project ID: " projectId
read -p "Storage Bucket: " storageBucket
read -p "Messaging Sender ID: " messagingSenderId
read -p "App ID: " appId
read -p "Measurement ID: " measurementId

echo ""
echo "Updating firebase.js with your configuration..."

# Create the config content
cat > ./src/services/firebase.js << EOL
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${apiKey}",
  authDomain: "${authDomain}",
  projectId: "${projectId}",
  storageBucket: "${storageBucket}",
  messagingSenderId: "${messagingSenderId}",
  appId: "${appId}",
  measurementId: "${measurementId}"
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
EOL

echo "Firebase configuration has been set up successfully!"
echo "You can now run 'npm start' to start your application."
