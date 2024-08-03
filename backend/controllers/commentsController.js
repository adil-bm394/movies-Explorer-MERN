const MoviesModel = require("../models/moviesModel");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");
const UserModel = require("../models/userModel");
const CommentModel = require("../models/commentModel");

const addCommentController = async (req, res) => {
  try {
    const { imdbID } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id;

    const movie = await MoviesModel.findOne({ imdbID });

    if (!movie) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Create a new comment
    const newComment = new CommentModel({
      comments: [
        {
          movie: movie._id,
          user: user._id,
          comment: commentText,
        },
      ],
    });

    await newComment.save();

    res.status(statusCodes.OK).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment.comments[0],
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};


const fetchCommentsController = async (req, res) => {
  try {
    const { imdbID } = req.params;

    const movie = await MoviesModel.findOne({ imdbID });

    if (!movie) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "Movie Not Found",
      });
    }

    // Fetch comments related to the movie
    const comments = await CommentModel.find({
      "comments.movie": movie._id,
    })
      .populate("comments.user", "name")
      .exec();

    // Extract and format comments
    const formattedComments = comments.flatMap((comment) =>
      comment.comments.map((c) => ({
        userId: c.user._id,
        userName: c.user.name,
        comment: c.comment
      }))
    );

    res.status(statusCodes.OK).json({
      success: true,
      message: "Comments fetched successfully",
      comments: formattedComments,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addCommentController, fetchCommentsController };
