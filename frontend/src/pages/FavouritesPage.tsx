import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MovieCard from "../components/common/MovieCard";
import { RootState, AppDispatch } from "../redux/store";
import { fetchFavorites } from "../redux/slices/favoritesSlice";

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, loading, error } = useSelector(
    (state: RootState) => state.favorites
  );

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (favorites.length === 0) {
    return <Typography>No favorite movies found.</Typography>;
  }

  return (
    <Container sx={{ marginTop: "15px" }}>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
