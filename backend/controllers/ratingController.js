const { default: mongoose } = require("mongoose");
const RatingModel = require("../models/ratingModel");

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
      return res.status(200).json(updatedDoc);
    } else {
      const newRating = new RatingModel({
        Ratings: [{ movie: movieId, user: userId, rating, userName }],
      });
      const savedRating = await newRating.save();
      return res.status(201).json(savedRating);
    }
  } catch (error) {
    console.log("error add rating",error.message)
    res.status(500).json({ message: error.message });
  }
};


const fetchRatingsController = async (req, res) => {
  try {
    const { movieId } = req.params;

    const ratings = await RatingModel.find({ "Ratings.movie": movieId });
    console.log("rating",ratings);

    const allRatings = ratings.flatMap((r) =>
      r.Ratings.filter((rating) => rating.movie.toString() === movieId)
    );
    
    res.status(200).json({ ratings:allRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRatingController, fetchRatingsController };
