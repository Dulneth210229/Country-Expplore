import axios from 'axios';
import * as api from '../../services/api';

jest.mock('axios');

describe('API Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCountries', () => {
        it('should fetch all countries successfully', async () => {
            const mockCountries = [
                { name: { common: 'USA' }, capital: ['Washington, D.C.'] },
                { name: { common: 'Canada' }, capital: ['Ottawa'] }
            ];
            axios.get.mockResolvedValue({ data: mockCountries });
            
            const result = await api.getAllCountries();
            
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
            expect(result).toEqual(mockCountries);
        });
        
        it('should handle error when fetching all countries fails', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));
            
            await expect(api.getAllCountries()).rejects.toThrow(errorMessage);
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
        });
    });

    describe('getCountryByName', () => {
        it('should fetch country by name successfully', async () => {
            const mockCountry = [{ name: { common: 'Germany' }, capital: ['Berlin'] }];
            axios.get.mockResolvedValue({ data: mockCountry });
            
            const result = await api.getCountryByName('germany');
            
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/germany');
            expect(result).toEqual(mockCountry);
        });
    });

    describe('getCountriesByRegion', () => {
        it('should fetch countries by region successfully', async () => {
            const mockRegionCountries = [
                { name: { common: 'Germany' }, region: 'Europe' },
                { name: { common: 'France' }, region: 'Europe' }
            ];
            axios.get.mockResolvedValue({ data: mockRegionCountries });
            
            const result = await api.getCountriesByRegion('europe');
            
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/europe');
            expect(result).toEqual(mockRegionCountries);
        });
    });

    describe('getCountriesBySubregion', () => {
        it('should fetch countries by subregion successfully', async () => {
            const mockSubregionCountries = [
                { name: { common: 'Sweden' }, subregion: 'Northern Europe' },
                { name: { common: 'Norway' }, subregion: 'Northern Europe' }
            ];
            axios.get.mockResolvedValue({ data: mockSubregionCountries });
            
            const result = await api.getCountriesBySubregion('northern europe');
            
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/subregion/northern europe');
            expect(result).toEqual(mockSubregionCountries);
        });
    });

    describe('searchCountries', () => {
        it('should filter countries by search query', async () => {
            const allCountries = [
                { name: { common: 'United States' } },
                { name: { common: 'United Kingdom' } },
                { name: { common: 'Canada' } }
            ];
            
            // Mock the getAllCountries function
            jest.spyOn(api, 'getAllCountries').mockResolvedValue(allCountries);
            
            const result = await api.searchCountries('united');
            
            expect(result).toEqual([
                { name: { common: 'United States' } },
                { name: { common: 'United Kingdom' } }
            ]);
        });
    });

    describe('getCountryByCode', () => {
        it('should fetch country by code successfully', async () => {
            const mockCountry = [{ name: { common: 'Germany' }, cca3: 'DEU' }];
            axios.get.mockResolvedValue({ data: mockCountry });
            
            const result = await api.getCountryByCode('DEU');
            
            expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/DEU');
            expect(result).toEqual(mockCountry);
        });
    });
});
});