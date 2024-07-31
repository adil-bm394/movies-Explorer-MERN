import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../utils/interface/types";

interface FavoritesState {
  favorites: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (movie: Movie, { rejectWithValue, getState }) => {
    const state: any = getState();
    const token = state.user.userDetails?.token; 

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addFavorite",
        { movieId: movie.imdbID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
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
        { movieId: imdbID },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      return response.data;
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
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        if (
          !state.favorites.some(
            (movie) => movie?.imdbID === action.payload.movie?.imdbID
          )
        ) {
          state.favorites.push(action.payload.movie);
        }
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
        state.favorites = state.favorites.filter(
          (movie) => movie.imdbID !== action.payload.movieId
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoritesSlice.reducer;
