import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Language,
  Public,
  Money,
  People,
  LocationOn,
} from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCountryByName } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [country, setCountry] = useState(location.state?.country || null);
  const [loading, setLoading] = useState(!location.state?.country);
  const [error, setError] = useState(null);

  // Fetch country details if not provided in location state
  useEffect(() => {
    if (!country) {
      const fetchCountryDetails = async () => {
        try {
          setLoading(true);
          const data = await getCountryByName(countryCode);
          if (data && data.length > 0) {
            setCountry(data[0]);
          } else {
            setError("Country not found.");
          }
        } catch (error) {
          setError("Failed to fetch country details.");
        } finally {
          setLoading(false);
        }
      };

      fetchCountryDetails();
    }
  }, [country, countryCode]);

  const handleToggleFavorite = () => {
    if (!currentUser) {
      // Prompt user to sign in
      alert("Please sign in to save favorites.");
      return;
    }

    if (country) {
      toggleFavorite(country);
    }
  };

  // Helper function to format population with commas
  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Helper function to get language list
  const getLanguages = (languages) => {
    return languages ? Object.values(languages) : [];
  };

  // Helper function to get currency details
  const getCurrencies = (currencies) => {
    if (!currencies) return [];
    return Object.entries(currencies).map(([code, currency]) => ({
      code,
      name: currency.name,
      symbol: currency.symbol,
    }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !country) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Country not found"}</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/countries")}
          sx={{ mt: 2 }}
        >
          Back to Countries
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/countries")}
        >
          Back to Countries
        </Button>
        <Tooltip
          title={
            isFavorite(country?.cca3)
              ? "Remove from Favorites"
              : "Add to Favorites"
          }
        >
          <IconButton
            color={isFavorite(country?.cca3) ? "secondary" : "default"}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite(country?.cca3)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {isFavorite(country?.cca3) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>

      <Card elevation={3} sx={{ mb: 4 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              sx={{
                height: "100%",
                objectFit: "cover",
                minHeight: "300px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {country.name.common}
              </Typography>
              {country.name.official !== country.name.common && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {country.name.official}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Capital:</strong>{" "}
                    {country.capital ? country.capital.join(", ") : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Region:</strong> {country.region}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Subregion:</strong> {country.subregion || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Population:</strong>{" "}
                    {formatPopulation(country.population)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Language sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Languages</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {getLanguages(country.languages).length > 0 ? (
                getLanguages(country.languages).map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No languages data available
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Money sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Currencies</Typography>
            </Box>
            {getCurrencies(country.currencies).length > 0 ? (
              getCurrencies(country.currencies).map((currency, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    <strong>{currency.name}</strong> ({currency.code})
                    {currency.symbol && ` ${currency.symbol}`}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No currency data available
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Public sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Geographic Information</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Area:</strong>{" "}
              {country.area ? `${formatPopulation(country.area)} km²` : "N/A"}
            </Typography>
            {country.borders && (
              <>
                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                  <strong>Borders with:</strong>
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {country.borders.length > 0 ? (
                    country.borders.map((border) => (
                      <Chip key={border} label={border} size="small" />
                    ))
                  ) : (
                    <Typography variant="body2">
                      None (Island or no land borders)
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        {country.maps && Object.values(country.maps).some(Boolean) && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Maps</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {country.maps.googleMaps && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps
                  </Button>
                )}
                {country.maps.openStreetMaps && (
                  <Button
                    variant="outlined"
                    color="primary"
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenStreetMap
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CountryDetail;
