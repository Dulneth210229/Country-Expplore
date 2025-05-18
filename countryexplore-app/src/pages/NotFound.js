import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: "5rem", md: "8rem" },
          fontWeight: "bold",
          color: "#ccc",
        }}
      >
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Home />}
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
