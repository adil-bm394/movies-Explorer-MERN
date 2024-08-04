import React from "react";
import { Grid, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Star } from "@mui/icons-material";
import FavoriteButton from "../../utils/FavouriteButton/FavoriteButton";
import { SimplifiedMovie } from "../../utils/interface/types";

const StarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StarIcon = styled(Star)({
  fill: "yellow",
});
interface MovieCardProps {
  movie: SimplifiedMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
 // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%", marginTop: 3 }}>
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
            Year: {movie.Year}
          </Typography>
          <StarContainer>
            <Typography variant="body1">
              <strong>Rated:</strong> {movie.imdbRating}
            </Typography>
            <StarIcon />
          </StarContainer>
          <FavoriteButton movie={movie} />
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
  );
};

export default MovieCard;
