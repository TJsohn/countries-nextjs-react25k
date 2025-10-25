import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/countries",
  async (_, { rejectWithValue }) => {
    // Start with the basic fields endpoint that works reliably
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,borders,cca3,area,languages"
      );

      return response.data;
    } catch (error) {
      // Try full endpoint as backup
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");

        return response.data;
      } catch (fieldsError) {
        // Try v2 as fallback
        try {
          const response = await axios.get("https://restcountries.com/v2/all");

          // Convert v2 format to v3 format for compatibility
          const convertedData = response.data.map((country) => ({
            name: {
              common: country.name,
              official: country.name,
            },
            flags: {
              svg: country.flag || country.flags?.svg,
              png: country.flags?.png,
            },
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital,
            area: country.area,
            languages: country.languages || {},
            currencies: country.currencies || {},
            timezones: country.timezones || [],
            borders: country.borders || [],
            cca3: country.alpha3Code,
            cioc: country.cioc,
          }));

          return convertedData;
        } catch (v2Error) {
          return rejectWithValue(
            "Unable to fetch countries data from any endpoint"
          );
        }
      }
    }
  }
);

export const selectCountryByName = (state, countryName) => {
  return state.countries.countries.find(
    (country) =>
      country.name.common.toLowerCase() === countryName.toLowerCase() ||
      country.name.official.toLowerCase() === countryName.toLowerCase()
  );
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.error = null;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCountry, clearSelectedCountry } =
  countriesSlice.actions;

export default countriesSlice.reducer;
