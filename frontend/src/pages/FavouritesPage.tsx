import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/common/MovieCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SimplifiedMovie } from "../utils/interface/types";


const FavoritePage: React.FC = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorites.favorites 
  );

  if (favoriteMovies.length === 0) {
    return <Typography>No favorite movies found.</Typography>;
  }

  const simplifiedMovies: SimplifiedMovie[] = favoriteMovies.map((movie) => ({
    Title: movie.Title,
    Poster: movie.Poster,
    Year: movie.Year,
    imdbRating: movie.imdbRating,
    Genre: movie.Genre,
    imdbID: movie.imdbID,
  }));

  return (
    <Container sx={{ width: "92%" }}>
      <Grid container spacing={3}>
        {simplifiedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritePage;
