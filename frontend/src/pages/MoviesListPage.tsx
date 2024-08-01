import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/common/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MoviesListPage: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const searchTerm = useSelector((state: RootState) =>
    state.search.term.toLowerCase()
  );

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <>
      <Container sx={{ width: "92%" }}>
        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <MovieCard movie={movie}  />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MoviesListPage;
