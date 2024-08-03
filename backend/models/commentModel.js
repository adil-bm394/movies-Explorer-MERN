const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
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
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
