import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import { toast } from "react-toastify";
import {  SimplifiedMovie } from "../../utils/interface/types";

interface FavoriteButtonProps {
  movie: SimplifiedMovie;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if (isLoggedIn) {
      if (isFavorite) {
        dispatch(removeFavorite(movie.imdbID));
        toast.success("Remove from Favourite");
      } else {
        dispatch(addFavorite(movie));
        toast.success("Added to Favourite");
      }
    } else {
      toast.error("You must be logged in to add favorite movies.");
    }
  };

  return (
    <IconButton onClick={handleFavoriteClick} color="default">
      {isFavorite ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;
