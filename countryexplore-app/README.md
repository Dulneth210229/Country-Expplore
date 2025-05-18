# Country Explorer

A modern, responsive React application that allows users to explore information about countries around the world. Built with React, Material UI, and Firebase authentication.

![Country Explorer Screenshot](https://via.placeholder.com/800x450?text=Country+Explorer+App)

## Features

- **Explore Countries**: Browse and search countries from around the world
- **Detailed Information**: View detailed information about each country including capital, population, languages, currencies, and more
- **Google Authentication**: Sign in with your Google account
- **Save Favorites**: Authenticated users can save their favorite countries for quick access
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface built with Material UI

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Material UI**: Component library for modern and responsive UI
- **Google Identity Services**: For authentication and user management
- **REST Countries API**: Source of country data
- **Axios**: For making HTTP requests
- **LocalStorage**: For persisting favorites

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A Google Cloud project with OAuth 2.0 credentials

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/country-explorer.git
   cd country-explorer
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Google Authentication:

   - Create a Google Cloud project at [Google Cloud Console](https://console.cloud.google.com/)
   - Set up OAuth 2.0 credentials and enable the Google Identity Services API
   - Run the setup script to configure your application with your Client ID:

   ```powershell
   .\setup-google-auth.ps1
   ```

   Or manually update the Client ID in `src/services/googleAuth.js`:

   ```javascript
   const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
   ```

   For detailed instructions, see [GOOGLE_AUTH_SETUP.md](GOOGLE_AUTH_SETUP.md)

4. Start the development server:

   ```
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  ├── assets/        # Images, icons, and other static assets
  ├── components/    # Reusable UI components
  ├── context/       # React Context API providers
  ├── pages/         # Main application pages
  ├── services/      # API and Firebase services
  ├── App.js         # Main application component
  └── index.js       # Application entry point
```

## Main Components

- **Navbar**: Navigation and authentication controls
- **CountryCard**: Displays country preview information
- **SearchAndFilter**: Search and filter countries by name or region
- **AuthContext**: Manages authentication state
- **FavoritesContext**: Manages user's favorite countries

## Future Enhancements

- Dark mode support
- Language translation
- Advanced filtering options
- Compare countries feature
- World map visualization

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [REST Countries API](https://restcountries.com/) for providing country data
- [Material UI](https://mui.com/) for the UI components
- [Google Identity Services](https://developers.google.com/identity) for authentication services
