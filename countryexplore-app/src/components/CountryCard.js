import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

const CountryCard = ({
  country,
  isFavorite: propIsFavorite,
  onRemoveFavorite,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Format population with commas
  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle card click
  const handleClick = () => {
    navigate(`/country/${country.cca3}`, { state: { country } });
  };

  // Handle favorite button click
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click event

    if (onRemoveFavorite) {
      // If specific handler provided (like in Favorites page), use it
      onRemoveFavorite();
    } else {
      // Otherwise use the context toggle
      toggleFavorite(country);
    }
  };

  // Determine if this country is a favorite
  const isFavorited =
    propIsFavorite !== undefined ? propIsFavorite : isFavorite(country.cca3);
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        },
        position: "relative",
      }}
    >
      {" "}
      {currentUser && (
        <IconButton
          size="small"
          color={isFavorited ? "secondary" : "default"}
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      )}
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={country.flags.png}
          alt={country.name.common}
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {country.name.common}
          </Typography>
          <Box>
            <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
              <strong>Capital:</strong>{" "}
              {country.capital ? country.capital.join(", ") : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
              <strong>Population:</strong>{" "}
              {formatPopulation(country.population)}
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>Region:</strong> {country.region}
            </Typography>
          </Box>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Tooltip title="Click for details">
              <Chip
                label="View Details"
                size="small"
                color="primary"
                variant="outlined"
                clickable
              />
            </Tooltip>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
