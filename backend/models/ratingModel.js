const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  comments: {
    type: [
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
      },
    ],
    default: [],
  },
});

const RatingModel = mongoose.model("Rating", ratingSchema);

module.exports = RatingModel;
