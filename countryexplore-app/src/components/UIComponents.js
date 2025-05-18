import React from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    }}
  >
    <CircularProgress />
  </Box>
);

const ErrorMessage = ({ message }) => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <Typography color="error" variant="h6">
      {message || "An error occurred. Please try again."}
    </Typography>
  </Box>
);

const EmptyState = ({ message }) => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <Typography variant="h6" color="text.secondary">
      {message || "No data found."}
    </Typography>
  </Box>
);

const NotFound = () => (
  <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
    <Typography variant="h2" component="h1" gutterBottom>
      404
    </Typography>
    <Typography variant="h4" component="h2" gutterBottom>
      Page Not Found
    </Typography>
    <Typography variant="body1" paragraph>
      The page you are looking for does not exist or has been moved.
    </Typography>
  </Container>
);

export { LoadingSpinner, ErrorMessage, EmptyState, NotFound };
