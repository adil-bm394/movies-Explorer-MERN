const express = require("express");
const {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController,
} = require("../controllers/moviesController");
const authMiddleware = require("../middleware/authmiddleware");


const router = express.Router();

router.get("/movies", moviesController);
router.post("/addFavorite", authMiddleware, addFavoriteController);
router.post("/removeFavorite", authMiddleware,removeFavoriteController);
router.get("/getfavorites", authMiddleware, getFavoritesController);

module.exports = router;
