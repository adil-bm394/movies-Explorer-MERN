const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  Ratings: [
    {
      movie: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Movie",
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
      userName: {
        type: String,
        required: true,
      },
    },
  ],
});

const RatingModel = mongoose.model("Rating", ratingSchema);

module.exports = RatingModel;
