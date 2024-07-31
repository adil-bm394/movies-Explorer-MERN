const express = require("express");
const {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
} = require("../controllers/moviesController");
const authMiddleware = require("../middleware/authmiddleware");


const router = express.Router();

router.get("/movies", moviesController);
router.post("/addFavorite", authMiddleware, addFavoriteController);
router.post("/removeFavorite", authMiddleware,removeFavoriteController);

module.exports = router;
