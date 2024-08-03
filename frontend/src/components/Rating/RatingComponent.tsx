import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRatings } from "../../redux/slices/moviesSlice";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

interface RatingComponentProps {
  isLoggedIn: boolean;
  initialRating: number | null;
  movieId: string;
  userId: string;
  userName: string;
  handleRatingClick: (value: number) => void;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  movieId,
 handleRatingClick,
  initialRating,
  userId,
  userName,
}) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const dispatch: AppDispatch = useDispatch(); // Apply the correct type
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchRatingsData = async () => {
      if (movieId) {
        try {
          const response = await dispatch(fetchRatings(movieId)).unwrap();
          const userRating = response.ratings.find(
            (r: { userId: string; rating: number }) => r.userId === userId
          );
          setRating(userRating ? userRating.rating : null);
        } catch (error) {
          console.error("Failed to fetch ratings", error);
        }
      }
    };

    fetchRatingsData();
  }, [movieId, dispatch, userId]);

  return (
    <>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton
          key={value}
          onClick={() => handleRatingClick(value)}
          //disabled={!isLoggedIn}
        >
          {rating && rating >= value ? (
            <StarIcon sx={{ color: "yellow" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ))}
    </>
  );
};

export default RatingComponent;
