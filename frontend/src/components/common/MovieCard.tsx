import React from "react";
import { Grid, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import { Movie } from "../../utils/interface/types";
import { RootState, AppDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";

const StarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StarIcon = styled(Star)({
  fill: "yellow",
});

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites || []
  );
  //console.log("Favourites Movies=>", typeof favorites, "=>", favorites);
  console.log("Movies=>", typeof movie, "=>", movie); //we get imdbID of movies as string from favorite page 

  const isFavorite = favorites.some(
    (favMovie) => favMovie.imdbID === movie.imdbID
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      try {
        await dispatch(removeFavorite(movie.imdbID)).unwrap();
        toast.success("Removed from favorites!");
      } catch (error) {
        toast.error("Failed to remove from favorites.");
      }
    } else if (isLoggedIn) {
      try {
        await dispatch(addFavorite(movie)).unwrap();
        toast.success("Added to favorites!");
      } catch (error) {
        toast.error("Failed to add to favorites.");
      }
    } else {
      toast.error("You must be logged in to add favorite movies.");
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ height: "100%", marginTop: 3 }}>
          <ToastContainer />
          <CardMedia
            component="img"
            alt={movie.Title}
            image={movie.Poster}
            title={movie.Title}
            height="400"
            style={{ objectFit: "fill" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              <strong>{movie.Title}</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`Year: ${movie.Year}`}
            </Typography>
            <StarContainer>
              <Typography variant="body1">
                <strong>Rated:</strong> {movie.imdbRating}
              </Typography>
              <StarIcon />
            </StarContainer>
            <IconButton
              color={isFavorite ? "secondary" : "primary"}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
            <Button
              component={Link}
              to={`/movies/${movie.imdbID}`}
              variant="outlined"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default MovieCard;



