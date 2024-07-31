import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RatingComponent from "./RatingComponent";
import { getRatingsFromIndexedDB } from "../../utils/LocalForage/LocalForage";
import { RootState } from "../../redux/store";

interface RatingDisplayComponentProps {
  movieId: string;
  onRatingClick: (value: number) => void;
  onRatingsFetched: (
    ratings: { userId: string; userName: string; rating: number }[]
  ) => void;
}

const RatingDisplayComponent: React.FC<RatingDisplayComponentProps> = ({
  movieId,
  onRatingClick,
  onRatingsFetched,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchRatings = async () => {
      const savedRatings = await getRatingsFromIndexedDB(movieId);
      //console.log(`Fetched ratings: ${savedRatings}`); // Debugging line
      const userRating =
        savedRatings.length > 0 ? savedRatings[0].rating : null;
      setRating(userRating);
      onRatingsFetched(savedRatings);
    };

    fetchRatings();
  }, [movieId, onRatingsFetched]);

  return (
    <RatingComponent
      isLoggedIn={isLoggedIn}
      initialRating={rating}
      onRatingClick={onRatingClick}
    />
  );
};

export default RatingDisplayComponent;
