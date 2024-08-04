const { mongoose } = require("mongoose");
const RatingModel = require("../models/ratingModel");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

const addRatingController = async (req, res) => {
  try {
    const { movieId, rating, userName } = req.body;
     const userId = req.user.id;

   const ratingDoc = await RatingModel.findOne({
      "Ratings.movie": movieId,
      "Ratings.user": userId,
    });

    if (ratingDoc) {
      const updatedDoc = await RatingModel.findOneAndUpdate(
        { "Ratings.movie": movieId, "Ratings.user": userId },
        {
          $set: {
            "Ratings.$.rating": rating,
            "Ratings.$.userName": userName,
          },
        },
        { new: true }
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: messages.UPDATE_SUCCESS, 
        updatedDoc,
      });
    } else {
      const newRating = new RatingModel({
        Ratings: [{ movie: movieId, user: userId, rating, userName }],
      });
      const savedRating = await newRating.save();
      return res.status(statusCodes.CREATED).json({
        success: true,
        message: messages.RATING_SAVED_SUCCESSFULLY, 
        savedRating,
      });
    }
  } catch (error) {
    console.log("error add rating",error.message)
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: messages.INTERNAL_SERVER_ERROR, 
      error: error.message, 
    });
  }
};


const fetchRatingsController = async (req, res) => {
  try {
    const { movieId } = req.params;

    const ratings = await RatingModel.find({ "Ratings.movie": movieId });

    const allRatings = ratings.flatMap((r) =>
      r.Ratings.filter((rating) => rating.movie.toString() === movieId)
    );

    res.status(statusCodes.OK).json({
      success: true,
      message: messages.RATINGS_FETCHED_SUCCESSFULLY,
      ratings: allRatings,
    });
  } catch (error) {
    console.log("error add rating", error.message);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: messages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = { addRatingController, fetchRatingsController };
