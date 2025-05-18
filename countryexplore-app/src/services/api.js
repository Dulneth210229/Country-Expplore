import axios from "axios";

const API_URL = "https://restcountries.com/v3.1";

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries", error);
    throw error;
  }
};

// Get country by name
export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country: ${name}`, error);
    throw error;
  }
};

// Get countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in region: ${region}`, error);
    throw error;
  }
};

// Get countries by subregion
export const getCountriesBySubregion = async (subregion) => {
  try {
    const response = await axios.get(`${API_URL}/subregion/${subregion}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in subregion: ${subregion}`, error);
    throw error;
  }
};

// Search countries by partial name
export const searchCountries = async (query) => {
  try {
    // Get all countries first
    const allCountries = await getAllCountries();

    // Filter countries by name
    return allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error(`Error searching countries: ${query}`, error);
    throw error;
  }
};

// Get country by code
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with code: ${code}`, error);
    throw error;
  }
};
