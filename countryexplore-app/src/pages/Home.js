import React from "react";
import { Container, Typography, Box, Button, Paper, Grid } from "@mui/material";
import { Public, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to Country Explorer
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Explore countries around the world, learn about their culture,
          geography, and more.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Public sx={{ fontSize: 60, color: "#2196F3", mb: 2 }} />
              <Typography variant="h4" component="h2" gutterBottom>
                Explore Countries
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Discover information about countries, their flags, populations,
                languages, and more.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Public />}
                onClick={() => navigate("/countries")}
                sx={{ mt: 2 }}
              >
                Start Exploring
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(233, 30, 99, 0.05)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Favorite sx={{ fontSize: 60, color: "#E91E63", mb: 2 }} />
              <Typography variant="h4" component="h2" gutterBottom>
                Save Favorites
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Create a personal collection of your favorite countries and
                access them anytime.
              </Typography>
              {currentUser ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Favorite />}
                  onClick={() => navigate("/favorites")}
                  sx={{ mt: 2 }}
                >
                  View Favorites
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={login}
                  sx={{ mt: 2 }}
                >
                  Sign In to Save Favorites
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
