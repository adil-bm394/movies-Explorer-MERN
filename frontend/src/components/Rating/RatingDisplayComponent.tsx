import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRatings } from "../../redux/slices/moviesSlice";
import RatingComponent from "./RatingComponent";

interface RatingDisplayComponentProps {
  movieId: string;
  handleRatingClick: (value: number) => void;
  onRatingsFetched: (
    ratings: { userId: string; userName: string; rating: number }[]
  ) => void;
}

const RatingDisplayComponent: React.FC<RatingDisplayComponentProps> = ({
  movieId,
  handleRatingClick,
  onRatingsFetched,
}) => {
  const dispatch: AppDispatch = useDispatch(); 
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const fetchRatingsData = async () => {
      try {
        const response = await dispatch(fetchRatings(movieId)).unwrap();
        onRatingsFetched(response.ratings);

        //console.log("response.ratings", response.ratings);

      } catch (error) {
        console.error("Failed to fetch ratings", error);
      }
    };

    fetchRatingsData();
  }, [movieId, dispatch, onRatingsFetched]);

  return (
    <RatingComponent
      isLoggedIn={isLoggedIn}
      initialRating={null}
      movieId={movieId}
      userId={userDetails?.id || ""}
      userName={userDetails?.name || ""}
      handleRatingClick={handleRatingClick}
    />
  );
};

export default RatingDisplayComponent;
