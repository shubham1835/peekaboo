import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyASMIZqKFDROa87NZ2lTg493pxtwbE9mgQ";

// Async thunk for reverse geocoding
export const fetchAddressFromCoords = createAsyncThunk(
  "location/fetchAddressFromCoords",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      }
      return "";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for place suggestions
export const fetchSuggestions = createAsyncThunk(
  "location/fetchSuggestions",
  async (text, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:in`
      );
      if (response.data.predictions) {
        return response.data.predictions;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for place details
export const fetchPlaceDetails = createAsyncThunk(
  "location/fetchPlaceDetails",
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const location = response.data.result.geometry.location;
      const formatted_address = response.data.result.formatted_address;

      return {
        address: formatted_address,
        region: {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  region: null,
  address: "",
  search: "",
  suggestions: [],
  loading: false,
  error: null,
  addressLoading: false,
  suggestionsLoading: false,
  placeDetailsLoading: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    clearSearch: (state) => {
      state.search = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch address from coordinates
      .addCase(fetchAddressFromCoords.pending, (state) => {
        state.addressLoading = true;
        state.error = null;
      })
      .addCase(fetchAddressFromCoords.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddressFromCoords.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      })
      // Fetch suggestions
      .addCase(fetchSuggestions.pending, (state) => {
        state.suggestionsLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.suggestionsLoading = false;
        state.error = action.payload;
      })
      // Fetch place details
      .addCase(fetchPlaceDetails.pending, (state) => {
        state.placeDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaceDetails.fulfilled, (state, action) => {
        state.placeDetailsLoading = false;
        state.address = action.payload.address;
        state.region = action.payload.region;
      })
      .addCase(fetchPlaceDetails.rejected, (state, action) => {
        state.placeDetailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setRegion,
  setAddress,
  setSearch,
  setSuggestions,
  clearSuggestions,
  clearSearch,
  clearError,
} = locationSlice.actions;

export default locationSlice.reducer;
