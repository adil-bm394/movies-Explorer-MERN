const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  comments: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      comment: String,
    },
  ],
  ratings: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      rating: Number,
    },
  ],
  favorites: [
    {
      type: String,
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
