import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { getAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";
import SearchAndFilter from "../components/SearchAndFilter";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const countriesPerPage = 12;

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch countries. Please try again later.");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    let result = [...countries];

    // Filter by search term
    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion) {
      result = result.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    setFilteredCountries(result);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedRegion, countries]);

  // Pagination logic
  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (page - 1) * countriesPerPage;
  const paginatedCountries = filteredCountries.slice(
    startIndex,
    startIndex + countriesPerPage
  );
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Get unique regions for filter dropdown
  const regions = [
    ...new Set(countries.map((country) => country.region)),
  ].filter(Boolean);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Countries
      </Typography>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : filteredCountries.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No countries found matching your criteria.
        </Alert>
      ) : (
        <>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedCountries.length} of {filteredCountries.length}{" "}
              countries
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {paginatedCountries.map((country) => (
              <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Countries;
