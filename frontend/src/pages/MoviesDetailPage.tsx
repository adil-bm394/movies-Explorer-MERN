import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import FavoriteButton from "../utils/FavouriteButton/FavoriteButton";
import UserComments from "../components/comments/UserComments";
import CommentInput from "../components/comments/CommentInput";
import RatingDisplayComponent from "../components/Rating/RatingDisplayComponent";
import {
  addRating,
  addComment,
  fetchComments,
} from "../redux/slices/moviesSlice";
import { Movie } from "../utils/interface/types";
import { AppDispatch } from "../redux/store";
import { AxiosError } from "axios";

const MoviesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id || "";

  const movie = useSelector((state: RootState) =>
    state.movies.movies.find((m) => m.imdbID === movieId)
  ) as Movie;

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const userId = userDetails?.id || "";
  const userName = userDetails?.name || "";

  const dispatch = useDispatch<AppDispatch>();
  const [comments, setComments] = useState<
    { userId: string; userName: string; comment: string }[]
  >([]);

  const [userRatings, setUserRatings] = useState<
    { userId: string; userName: string; rating: number }[]
  >([]);

  useEffect(() => {
    if (!movieId) return;

    dispatch(fetchComments(movieId))
      .unwrap()
      .then((data) => setComments(data.comments || []))
      .catch((error) => {
        const axiosError = error as AxiosError;
        toast.error(axiosError.message || "Failed to fetch comments");
      });
  }, [movieId, dispatch]);

  const handleRatingClick = async (value: number) => {
    if (isLoggedIn) {
      try {
        await dispatch(addRating({ movieId, rating: value, userId, userName }));
        toast.success("Rating added successfully");
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.message || "Failed to add rating");
      }
    } else {
      toast.error("You must be logged in to rate movies.");
    }
  };

  const handleCommentSubmit = async (comment: string) => {
    if (isLoggedIn) {
      try {
        const resultAction = await dispatch(
          addComment({ movieId, comment, userId, userName })
        ).unwrap();

        setComments([
          ...comments,
          { userId, userName, comment: resultAction.comment },
        ]);

        toast.success("Comment added successfully");
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.message || "Failed to add comment");
      }
    } else {
      toast.error("You must be logged in to add comments.");
    }
  };

  const handleRatingsFetched = (
    ratings: { userId: string; userName: string; rating: number }[]
  ) => {
    setUserRatings(ratings);
  };

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  return (
    <Container>
      <Card sx={{ marginTop: 4 }}>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <CardMedia
            component="img"
            alt={movie.Title}
            height="470"
            image={movie.Poster}
            title={movie.Title}
            sx={{ flex: "1 1 auto", maxWidth: "50%", objectFit: "fill" }}
          />
          <CardContent sx={{ flex: "1 1 auto", maxWidth: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                <strong>{movie.Title}</strong>
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Plot}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1">
                <strong>Year:</strong> {movie.Year}
              </Typography>
              <Typography variant="body1">
                <strong>Rated:</strong> {movie.imdbRating}
              </Typography>
              <Typography variant="body1">
                <strong>Released:</strong> {movie.Released}
              </Typography>
              <Typography variant="body1">
                <strong>Runtime:</strong> {movie.Runtime}
              </Typography>
              <Typography variant="body1">
                <strong>Genre:</strong> {movie.Genre}
              </Typography>
              <Typography variant="body1">
                <strong>Director:</strong> {movie.Director}
              </Typography>
              <Typography variant="body1">
                <strong>Writer:</strong> {movie.Writer}
              </Typography>
              <Typography variant="body1">
                <strong>Actors:</strong> {movie.Actors}
              </Typography>
              <Typography variant="body1">
                <strong>Language:</strong> {movie.Language}
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {movie.Country}
              </Typography>
              <Typography variant="body1">
                <strong>Awards:</strong> {movie.Awards}
              </Typography>
              <Typography variant="body1">
                <strong>BoxOffice:</strong> {movie.BoxOffice}
              </Typography>

              <Box>
                {/* Favorites button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <FavoriteButton movie={movie} />
                </Box>

                {/* Ratings */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Rate this movie:
                  </Typography>
                  <RatingDisplayComponent
                    movieId={movie.imdbID}
                    handleRatingClick={handleRatingClick}
                    onRatingsFetched={handleRatingsFetched}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>

        <CardContent>
          {isLoggedIn && (
            <CommentInput
              movieId={movie.imdbID}
              isLoggedIn={isLoggedIn}
              onSubmit={handleCommentSubmit}
            />
          )}

          {/* User comments */}
          <UserComments comments={comments} />

          {/* User Ratings */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div">
              User Ratings
            </Typography>
            {userRatings?.length > 0 ? (
              <List>
                {userRatings.map((rating) => (
                  <ListItem key={rating.userId}>
                    <Typography variant="body1">
                      <strong>{rating.userName}:</strong>{" "}
                      {Array.from({ length: rating.rating }, (_, index) => (
                        <IconButton key={index} disabled>
                          <StarIcon sx={{ color: "yellow" }} />
                        </IconButton>
                      ))}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No ratings yet.</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default MoviesDetailPage;
