const express = require("express");
const {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController,
} = require("../controllers/moviesController");
const authMiddleware = require("../middleware/authmiddleware");
const { addCommentController, fetchCommentsController } = require("../controllers/commentsController");


const router = express.Router();

router.get("/movies", moviesController);
router.post("/addFavorite", authMiddleware, addFavoriteController);
router.post("/removeFavorite", authMiddleware,removeFavoriteController);
router.get("/getfavorites", authMiddleware, getFavoritesController);
// Route to add a comment
router.post("/addComments/:imdbID",authMiddleware,addCommentController);

// Route to fetch comments
router.get("/fetchComments/:imdbID", fetchCommentsController);

module.exports = router;
