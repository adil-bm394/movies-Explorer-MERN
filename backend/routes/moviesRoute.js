const express = require("express");
const {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController,
} = require("../controllers/moviesController");
const authMiddleware = require("../middleware/authmiddleware");
const { addCommentController, fetchCommentsController } = require("../controllers/commentsController");
const { addRatingController, fetchRatingsController } = require("../controllers/ratingController");


const router = express.Router();

router.get("/movies", moviesController);
router.post("/addFavorite", authMiddleware, addFavoriteController);
router.post("/removeFavorite", authMiddleware,removeFavoriteController);
router.get("/getfavorites", authMiddleware, getFavoritesController);
router.post("/addComments/:imdbID",authMiddleware,addCommentController);
router.get("/fetchComments/:imdbID", fetchCommentsController);
router.post("/addRating",authMiddleware, addRatingController);
router.get('/fetchRatings/:movieId',fetchRatingsController);

module.exports = router;
