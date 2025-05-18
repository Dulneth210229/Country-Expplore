import React from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions = [],
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Search and Filter
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for a country"
            placeholder="Type country name..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="region-filter-label">Filter by Region</InputLabel>
            <Select
              labelId="region-filter-label"
              id="region-filter"
              value={selectedRegion}
              onChange={handleRegionChange}
              label="Filter by Region"
              startAdornment={
                <InputAdornment position="start">
                  <FilterIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.length > 0 ? (
                regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))
              ) : (
                <>
                  <MenuItem value="Africa">Africa</MenuItem>
                  <MenuItem value="Americas">Americas</MenuItem>
                  <MenuItem value="Asia">Asia</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                  <MenuItem value="Oceania">Oceania</MenuItem>
                  <MenuItem value="Antarctic">Antarctic</MenuItem>
                </>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchAndFilter;
