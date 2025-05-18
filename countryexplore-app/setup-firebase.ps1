# Country Explorer - Firebase Setup Script (PowerShell)
# This script helps you set up your Firebase configuration

Write-Host "Setting up Firebase Configuration for Country Explorer" -ForegroundColor Green
Write-Host "----------------------------------------------------"
Write-Host ""
Write-Host "Please create a Firebase project at https://console.firebase.google.com/"
Write-Host "Enable Google authentication and get your config values"
Write-Host ""
Write-Host "Enter your Firebase configuration values:" -ForegroundColor Yellow

$apiKey = Read-Host "API Key"
$authDomain = Read-Host "Auth Domain"
$projectId = Read-Host "Project ID"
$storageBucket = Read-Host "Storage Bucket"
$messagingSenderId = Read-Host "Messaging Sender ID"
$appId = Read-Host "App ID"
$measurementId = Read-Host "Measurement ID"

Write-Host ""
Write-Host "Updating firebase.js with your configuration..." -ForegroundColor Cyan

# Create the config content
$firebaseConfig = @"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "$apiKey",
  authDomain: "$authDomain",
  projectId: "$projectId",
  storageBucket: "$storageBucket",
  messagingSenderId: "$messagingSenderId",
  appId: "$appId",
  measurementId: "$measurementId"
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
"@

# Write to file
$firebaseConfig | Out-File -FilePath ".\src\services\firebase.js" -Encoding utf8

Write-Host "Firebase configuration has been set up successfully!" -ForegroundColor Green
Write-Host "You can now run 'npm start' to start your application." -ForegroundColor Green
