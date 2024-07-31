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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import FavoriteButton from "../utils/FavouriteButton/FavoriteButton";
import UserComments from "../components/comments/UserComments";
import CommentInput from "../components/comments/CommentInput";
import RatingDisplayComponent from "../components/Rating/RatingDisplayComponent";
import {
  saveRatingToIndexedDB,
  saveCommentToIndexedDB,
  getCommentsFromIndexedDB,
} from "../utils/LocalForage/LocalForage";
import { addRating, addComment } from "../redux/slices/moviesSlice";

const MoviesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id || "";

  const movie = useSelector((state: RootState) =>
    state.movies.movies.find((m) => m.imdbID === movieId)
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const userId = userDetails?.id || "";
  const userName = userDetails?.name || "";

  const dispatch = useDispatch();

  const [comments, setComments] = useState<
    { userId: string; userName: string; comment: string }[]
  >([]);

  const [userRatings, setUserRatings] = useState<
    { userId: string; userName: string; rating: number }[]
  >([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchComments = async () => {
      const savedComments = await getCommentsFromIndexedDB(movieId);
      setComments(savedComments);
    };

    fetchComments();
  }, [movieId]);

  const handleRatingClick = async (value: number) => {
    if (isLoggedIn) {
      console.log(`User rated ${movie?.Title} with ${value} stars.`);
      await saveRatingToIndexedDB(movieId, { userId, userName, rating: value });
      dispatch(addRating({ movieId, rating: value, userId, userName }));
    } else {
      toast.error("You must be logged in to rate movies.");
    }
  };

  const handleCommentSubmit = async (comment: string) => {
    if (isLoggedIn) {
      const newComment = { userId, userName, comment };
      await saveCommentToIndexedDB(movieId, newComment);
      dispatch(addComment({ movieId, comment, userId, userName }));
      setComments([...comments, newComment]);
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
                  <FavoriteButton movieId={movie.imdbID} />
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
                    onRatingClick={handleRatingClick}
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
            {userRatings.length > 0 ? (
              <List>
                {userRatings.map((rating) => (
                  <ListItem key={rating.userId}>
                    <Typography variant="body1">
                      <strong>{rating.userName}:</strong> {rating.rating} stars
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
