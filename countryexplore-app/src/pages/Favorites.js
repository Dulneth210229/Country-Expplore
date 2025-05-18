import React from "react";
import { Container, Grid, Box, Typography, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import CountryCard from "../components/CountryCard";
import { Favorite, Public } from "@mui/icons-material";

const Favorites = () => {
  const { currentUser, login } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  // If user is not authenticated, show sign-in prompt
  if (!currentUser) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Favorite sx={{ fontSize: 60, color: "#E91E63", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in to View Your Favorites
          </Typography>
          <Typography variant="body1" paragraph>
            Create a personal collection of your favorite countries. Sign in to
            view or create your collection.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={login}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Favorite Countries
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ py: 4 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            You haven't added any countries to your favorites yet.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Public />}
            onClick={() => navigate("/countries")}
          >
            Explore Countries
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body1" paragraph color="text.secondary">
            You have {favorites.length}{" "}
            {favorites.length === 1 ? "country" : "countries"} in your
            favorites.
          </Typography>

          <Grid container spacing={3}>
            {favorites.map((country) => (
              <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
                {" "}
                <CountryCard
                  country={country}
                  isFavorite={true}
                  onRemoveFavorite={() => removeFavorite(country.cca3)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Favorites;
