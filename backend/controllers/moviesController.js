const MoviesModel = require("../models/moviesModel");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

const moviesController = async (req, res) => {
  try {
    const movies = await MoviesModel.find();
    res.status(statusCodes.OK).json({
      success: "true",
      movies: movies,
    });
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const addFavoriteController = async (req, res) => {
  const { movieId } = req.body;
  // console.log("movieId=>", movieId);
  const user = req.user;

  try {
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.status(statusCodes.OK).json({
      success: "true",
      message: messages.ADD_FAVORITE_SUCCESS,
      favorites: user.favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: "false",
      error: error.message,
    });
  }
};

const removeFavoriteController = async (req, res) => {
  const { movieId } = req.body;
  const user = req.user;

  try {
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== movieId
    );
    await user.save();

    res.status(statusCodes.OK).json({
      success: "true",
      message: messages.REMOVE_FAVORITE_SUCCESS,
      favorites: user.favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: "false",
      error: error.message,
    });
  }
};

module.exports = {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
};
