import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
} from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue
      light: "#6ec6ff",
      dark: "#0069c0",
    },
    secondary: {
      main: "#e91e63", // Pink
      light: "#ff6090",
      dark: "#b0003a",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", pt: 2 }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route
                    path="/country/:countryCode"
                    element={<CountryDetail />}
                  />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: "auto",
                  backgroundColor: "background.paper",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} Country Explorer | Built with
                  React & Material UI
                </Typography>
              </Box>
            </Box>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
