import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FavoritesState, Movie, SimplifiedMovie } from "../../utils/interface/types";


const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState();
    const token = state.user.userDetails?.token;

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/getfavorites",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "response for getllFAv from backend ",
        response.data.favorites
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (movie: SimplifiedMovie, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const token = state.user.userDetails?.token;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addFavorite",
        { imdbID: movie.imdbID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response backend for addFavourite", response.data.favorites);
      return response.data.favorites;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (imdbID: string, { rejectWithValue, getState }) => {
    const state: any = getState();
    const token = state.user.userDetails?.token;

    try {
      
      const response = await axios.post(
        "http://localhost:8000/api/v1/removeFavorite",
        { imdbID },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { imdbID };
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const removedImdbID = action.payload.imdbID;
        state.favorites = state.favorites.filter(
          (movie) => movie.imdbID !== removedImdbID
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoritesSlice.reducer;
