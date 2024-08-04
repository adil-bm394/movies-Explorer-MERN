import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { RatingComponentProps } from "../../utils/interface/types";



const RatingComponent: React.FC<RatingComponentProps> = ({
  movieId,
  handleRatingClick,
  initialRating,
  userId,
  userName,
}) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (initialRating !== null) {
      setRating(initialRating);
    }
  }, [initialRating]);

  const handleClick = (value: number) => {
    if (isLoggedIn) {
      setRating(value);
      handleRatingClick(value); 
    } else {
      console.warn("User is not logged in");
    }
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton key={value} onClick={() => handleClick(value)}>
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
