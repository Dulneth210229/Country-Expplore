# Google Authentication Setup

This project uses Google's Identity Services API directly for authentication. Follow these steps to set up Google Authentication:

## Setup Steps

1. **Create a Google Cloud Project**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Configure OAuth Consent Screen**:

   - Navigate to "APIs & Services" > "OAuth consent screen"
   - Select "External" user type (unless you're using a Google Workspace)
   - Fill in the required app information:
     - App name: "Country Explorer"
     - User support email: Your email
     - Developer contact information: Your email
   - Save and continue

3. **Create OAuth 2.0 Credentials**:

   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Name: "Country Explorer Web Client"
   - Authorized JavaScript origins: Add `http://localhost:3000` for local development
   - Authorized redirect URIs: Add `http://localhost:3000` for local development
   - Click "Create"
   - Note your Client ID (you'll need it in the next step)

4. **Configure Your Application**:

   - Run the setup script:

   ```powershell
   .\setup-google-auth.ps1
   ```

   - Enter your Google Client ID when prompted

5. **Testing Authentication**:
   - Start your application:
   ```
   npm start
   ```
   - Click "Sign In" in the navigation bar
   - You should see the Google authentication window

## How It Works

This implementation uses Google's Identity Services API directly:

- **GoogleAuth Service**: Handles authentication with Google's Identity Services
- **AuthContext**: Provides authentication state to the entire application
- **Login Flow**:
  1. User clicks "Sign In"
  2. Google One Tap UI appears
  3. User selects their Google account
  4. The app receives the user information
  5. User is now authenticated

## Production Deployment

When deploying to production:

1. Update your OAuth 2.0 Client ID in Google Cloud Console:

   - Add your production domain to "Authorized JavaScript origins"
   - Add your production domain to "Authorized redirect URIs"

2. Update your application configuration with the production URL

## Troubleshooting

If you encounter authentication issues:

1. **Check your Google Cloud Console settings**:

   - Ensure the OAuth consent screen is configured correctly
   - Verify that the authorized domains include your testing domain

2. **Review browser console**:

   - Look for error messages related to Google authentication

3. **Clear browser data**:

   - Try clearing cookies and local storage

4. **Check Client ID**:
   - Ensure you're using the correct Client ID in your application
