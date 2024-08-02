// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   comments: [
//     {
//       movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
//       comment: String,
//     },
//   ],
//   ratings: [
//     {
//       movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
//       rating: Number,
//     },
//   ],
//   favorites: [
//     {
//       type: [mongoose.Schema.Types.Mixed],
//       default: [],
//     },
//   ],
// });

// const UserModel = mongoose.model("User", userSchema);

// module.exports = UserModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
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
      Title: { type: String },
      Poster: { type: String },
      Year: { type: String },
      imdbRating: { type: String },
      Genre: { type: String },
      imdbID: { type: String },
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

