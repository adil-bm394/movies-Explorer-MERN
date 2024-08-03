import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie, MoviesState } from "../../utils/interface/types";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/movies");
  return response.data;
});

export const addComment = createAsyncThunk(
  "movies/addComment",
  async (
    payload: {
      movieId: string;
      comment: string;
      userId: string;
      userName: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state: any = getState();
    const token = state.user.userDetails?.token;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/addComments/${payload.movieId}`,
        {
          commentText: payload.comment,
          userId: payload.userId,
          userName: payload.userName,
        },
        { headers: { Authorization: `Bearer ${token}` } }

      );

     // console.log("add comments", response.data.comment.comment);

      return { movieId: payload.movieId, comment: response.data.comment.comment };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Unknown error");
    }
  }
);

export const fetchComments = createAsyncThunk(
  "movies/fetchComments",
  async (movieId: string, { rejectWithValue }) => {
    console.log("movieId", movieId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/fetchComments/${movieId}`
      );

      console.log("comments", response.data.comments);

      return { movieId, comments: response.data.comments };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Unknown error");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
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
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const { movieId, comment } = action.payload;
        const movie = state.movies.find((m) => m._id === movieId);
        if (movie) {
          movie.comments.push(comment); 
        }
      })

      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add comment";
      })
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { movieId, comments } = action.payload;
        const movie = state.movies.find((m) => m._id === movieId);
        if (movie) {
          movie.comments = comments;
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export const { addRating } = moviesSlice.actions;
export default moviesSlice.reducer;
