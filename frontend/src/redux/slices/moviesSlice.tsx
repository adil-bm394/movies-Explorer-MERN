import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie, MoviesState } from "../../utils/interface/types";

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/movies");

   console.log("response from backend ", response.data);
  return response.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{
        movieId: string;
        comment: string;
        userId: string;
        userName: string;
      }>
    ) => {
      const { movieId, comment, userId, userName } = action.payload;
      const movie = state.movies.find((m) => m._id === movieId);
      if (movie) {
        movie.comments.push({ userId, userName, comment });
      }
    },
    addRating: (
      state,
      action: PayloadAction<{
        movieId: string;
        rating: number;
        userId: string;
        userName: string;
      }>
    ) => {
      const { movieId, rating, userId, userName } = action.payload;
      const movie = state.movies.find((m) => m._id === movieId);
      if (movie) {
        movie.ratings.push({ userId, userName, rating });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload?.movies;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { addComment, addRating } = moviesSlice.actions;
export default moviesSlice.reducer;
