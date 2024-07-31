import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import { toast } from "react-toastify";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const movie = useSelector((state: RootState) =>
    state.movies.movies.find((m) => m.imdbID === movieId)
  );

  const isFavorite = favorites.some((favMovie) => favMovie.imdbID === movieId);

  const handleFavoriteClick = () => {
    if (isLoggedIn) {
      if (movie) {
        if (isFavorite) {
          dispatch(removeFavorite(movie.imdbID));
        } else {
          dispatch(addFavorite(movie));
        }
      } else {
        toast.error("Movie not found.");
      }
    } else {
      toast.error("You must be logged in to add favorite movies.");
    }
  };

  return (
    <IconButton
      onClick={handleFavoriteClick}
      color={isFavorite ? "secondary" : "default"}
    >
      {isFavorite ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;
