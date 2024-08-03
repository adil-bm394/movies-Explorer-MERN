import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/common/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Define a simplified Movie type
interface SimplifiedMovie {
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
  Genre: string;
  imdbID: string;
}

const MoviesListPage: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const searchTerm = useSelector((state: RootState) =>
    state.search.term.toLowerCase()
  );

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return (
      <Container sx={{ width: "92%" }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ width: "92%" }}>
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  // Map to the simplified movie structure
  const simplifiedMovies: SimplifiedMovie[] = filteredMovies.map((movie) => ({
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

export default MoviesListPage;
