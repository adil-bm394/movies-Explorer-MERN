const MoviesModel = require("../models/moviesModel");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");
const UserModel = require("../models/userModel");

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
  try {
    const { imdbID } = req.body;
    const userId = req.user.id;

    const movie = await MoviesModel.findOne({ imdbID });

    if (!movie) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: "false",
        message: "Movie Not Found",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: "false",
        message: "User Not Found",
      });
    }
     const isFavorite = user.favorites.some((fav) => fav.imdbID === imdbID);
    if (isFavorite) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: "false",
        message: messages.MOVIE_NOT_EXISTS,
      });
    }

    const favoriteMovie = {
      Title: movie.Title,
      Poster: movie.Poster,
      Year: movie.Year,
      imdbRating: movie.imdbRating,
      Genre: movie.Genre,
      imdbID: movie.imdbID,
    };

    user.favorites.push(favoriteMovie);
    await user.save();

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
 try {
   const { imdbID } = req.body;
   const userId = req.user.id;

   const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: "false",
        message: "User Not Found",
      });
    }
    const movie = await MoviesModel.findOne({ imdbID });

    if (!movie) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: "false",
        message: "Movie Not Found",
      });
    }
   user.favorites = user.favorites.filter(
     (favorite) => favorite.imdbID !== imdbID
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
     error: error.message,    });
 }
 };

const getFavoritesController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User.",
      });
    }

    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: "false",
        message: "User Not Found",
      });
    }

    const favoriteMovies = user.favorites;

    if (!favoriteMovies || favoriteMovies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No favorite movies found.",
        favorites: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Favorites fetched successfully.",
      favorites: favoriteMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};









module.exports = {
  moviesController,
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController
};
