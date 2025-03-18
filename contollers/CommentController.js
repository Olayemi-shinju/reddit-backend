const Comment = require("../models/CommentModel");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");


const createComment = async (req, res) => {
  try {
    const post_id = req.params.postId;
    if (!post_id) return res.send({ status: 400, msg: "Post Id Required" });

    // Validate post ID existence
    const post = await Post.findById(post_id);
    if (!post) return res.send({ status: 404, msg: "Post not found" });

    const { text, user_id } = req.body;
    if (!user_id) return res.send({ status: 400, msg: "User ID Required" });

    // Create the comment
    const comment = new Comment({ text, post: post_id, user: user_id });
    const savedComment = await comment.save();

    // Add the comment to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    // Populate the user in the comment
    const populatedComment = await Comment.populate(savedComment, { path: 'user', select: '-password -__v' });

    // Send success response
    res.send({ status: 200, msg: "Comment created successfully", data: populatedComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.send({ status: 500, msg: "Error creating comment" });
  }
};


const getSinglePostComment = async (req, res) => {
  try {
    const post_id = req.params.id;
    if (!post_id) return res.send({ status: 400, msg: "Post Id Not Found" });

    // Validate post ID existence
    const post = await Post.findById(post_id);
    if (!post) return res.send({ status: 404, msg: "Post not found" });

    const comments = await Comment.find({ post: post_id }).populate("user", {
      password: 0,
      __v: 0,
    });

    if (!comments.length) {
      return res.send({ status: 404, msg: "No comments found for this post" });
    }

    res.send({
      status: 200,
      msg: "Comments found",
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.send({ status: 500, msg: "An error occurred while fetching comments" });
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate("post")
    res.send({
      status: 200,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.send({
      status: 500,
      msg: "Error fetching comments",
    });
  }
};
const getSingleUserComment = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) return res.send({ status: 404, msg: "User Not Found" });
      const comment = await Comment.find({ user: userId }).populate('user', {password: 0, __v: 0});
      if (!comment.length) return res.send({ status: 404, msg: "No Comment Found" });
      res.send({ status: 200, msg: "User Comments", data: comment });
    } catch (error) {
      console.error('Error fetching user comments:', error);
      res.send({ status: 500, msg: 'Error fetching user comments' });
    }
  };

  const deleteComment = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Comment.findByIdAndDelete(postId).populate('user', {password: 0, __v: 0})
      if (!post) return res.send({ status: 404, msg: "Post Not Found" });
  
      res.send({ status: 200, msg: 'Comment deleted successfully', data: post });
    } catch (error) {
      console.error(error);
      res.send({ status: 500, msg: "Failed to delete comment" });
    }
  };
  

module.exports = { createComment, getAllComment, getSinglePostComment, getSingleUserComment, deleteComment };
