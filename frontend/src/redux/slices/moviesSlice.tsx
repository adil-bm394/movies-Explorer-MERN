import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie, MoviesState } from "../../utils/interface/types";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const response = await axios.get("http://localhost:8000/api/v1/movies");
    return response.data.movies;
  }
);

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

      return {
        movieId: payload.movieId,
        comment: response.data.comment,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Unknown error");
    }
  }
);

export const addRating = createAsyncThunk(
  "movies/addRating",
  async (
    payload: {
      movieId: string;
      rating: number;
      userId: string;
      userName: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state: any = getState();
    const token = state.user.userDetails?.token;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/addRating",
        {
          movieId: payload.movieId,
          rating: payload.rating,
          userId: payload.userId,
          userName: payload.userName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return {
        movieId: payload.movieId,
        rating: response.data.rating,
        userId: payload.userId,
        userName: payload.userName,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Unknown error");
    }
  }
);

export const fetchComments = createAsyncThunk(
  "movies/fetchComments",
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/fetchComments/${movieId}`
      );

      return { movieId, comments: response.data.comments };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Unknown error");
    }
  }
);

export const fetchRatings = createAsyncThunk<
  {
    movieId: string;
    ratings: { userId: string; userName: string; rating: number }[];
  },
  string
>("movies/fetchRatings", async (movieId: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/fetchRatings/${movieId}`
    );
    
    //console.log("response.data.ratings", response.data);

    return { movieId, ratings: response.data.ratings };
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.response?.data || "Unknown error");
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
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
      .addCase(addRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.loading = false;
        const { movieId, rating, userId, userName } = action.payload;
        const movie = state.movies.find((m) => m._id === movieId);
        if (movie) {
          const existingRating = movie.ratings.find((r) => r.userId === userId);
          if (existingRating) {
            existingRating.rating = rating;
            existingRating.userName = userName;
          } else {
            movie.ratings.push({ userId, userName, rating });
          }
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add rating";
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
      })
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        const { movieId, ratings } = action.payload;
        const movie = state.movies.find((m) => m._id === movieId);
        if (movie) {
          movie.ratings = ratings;
        }
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch ratings";
      });
  },
});

export default moviesSlice.reducer;
