import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { RootState } from "../redux/store";
import MovieCardPage from "../components/common/MovieCard";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  if (favorites.length === 0) {
    return <Typography>No favorite movies found.</Typography>;
  }

  return (
    <Container sx={{ marginTop: "15px" }}>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie?.imdbID}>
            <MovieCardPage movie={movie} isFavorite />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
