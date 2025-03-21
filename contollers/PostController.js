const Comment = require("../models/CommentModel");
const Like = require("../models/LikeModel");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");

const createPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.send({ status: 400, msg: "User ID is required" });
    }

    let { title, body, img, url } = req.body;
    let check = true;
    if (body == null || body == "") {
      check = true;
    } else if (img == null || img == "") {
      check = true;
    } else if (url == null || url == "") {
      check = true;
    } else {
      check = false;
    }

    if (check == false) {
      return res.send({ status: 405, msg: "Either Body or Image Required" });
    }
    if (req.files && req.files.img) {
      img = req.files.img[0].path; // Cloudinary stores the URL in `path`
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.send({ status: 404, msg: "User not found" });
    }

    // Create a new post object
    const newPost = { user, title, body, img, url, comments: [] };

    // Create a new post and save it to the database
    const createMoment = new Post(newPost);
    const resp = await createMoment.save();

    // Send a response with the created post data
    res.send({ status: 200, msg: "Post Created", data: resp });
  } catch (error) {
    console.error(error);
    res.send({ status: 500, msg: "An Error Occurred" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const resp = await Post.find()
      .populate("user", "-password -__v")
      .populate("comments") 
      .populate({
        path: "comments",
        populate: { path: "user", select: "-password -__v" }, 
      });

    res.send({ status: 200, data: resp });
  } catch (error) {
    res.send({ status: 400, msg: "An Error occurred" });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Post.findById(id)
      .populate("user", {
        password: 0,
        __v: 0,
      })
      .populate("likes")
      .populate("comments") // Populate comments
      .populate({
        path: "comments",
        populate: { path: "user", select: "-password -__v" }, // Populate user data for each comment
      });

    if (!resp) return res.send({ status: 404, msg: "Post Not Found" });
    res.send({
      status: 200,
      msg: "Post Found",
      data: resp,
    });
  } catch (error) {
    res.send({
      status: 500,
      msg: "An Errod Ocurred",
    });
  }
};

const getSingleUserPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.send({ status: 404, msg: "User Not Found" });
    const post = await Post.find({ user: userId }).populate("user", {
      password: 0,
      __v: 0,
    });
    if (!post.length) return res.send({ status: 404, msg: "No Post Found" });
    res.send({ status: 200, msg: "User Posts", data: post });
  } catch (error) {
    res.send({
      status: 500,
      msg: "An Error Ocurred",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Comment.deleteMany({ post: postId });
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.send({ status: 404, msg: "Post Not Found" });
    res.send({ status: 200, msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.send({ status: 500, msg: "Failed to delete post and comments" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, body, url } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.send({ status: 404, msg: "Post Not Found" });

    // Update the post
    post.title = title;
    post.body = body;
    post.url = url;

    // Handle uploaded file
    if (req.file) {
      post.img = req.file.path;
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.send({
      status: 200,
      msg: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.send({ status: 500, msg: "Failed to update post" });
  }
};

const likePost = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const checkPostId = await Post.findById(post_id);
    if (!checkPostId)
      return res.send({ status: 403, msg: "Post ID does not exist" });
    const checkUserId = await User.findById(user_id);
    if (!checkUserId)
      return res.send({ status: 403, msg: "User ID does not exist" });
    const checkIfAlreadyLiked = await Like.findOne({
      post: post_id,
      user: user_id,
    });
    if (checkIfAlreadyLiked)
      return res.send({ status: 403, msg: "User has already liked this post" });
    const likeData = { post: post_id, user: user_id };
    const create_like = new Like(likeData);
    const newData = await create_like.save();
    const post = await Post.findById(post_id);
    post.likes = await Like.countDocuments({ post: post_id });
    await post.save();
    res.send({ status: 200, msg: "Post liked", data: newData });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, msg: "An error occured" });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const resp = await Like.find();
    res.send({ status: 200, msg: "Post liked", data: resp });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, msg: "An error occured" });
  }
};

const getAllPostLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Like.countDocuments({ post: id });
    res.send({ status: 200, msg: "Post likes", data: resp });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, msg: "An error occured" });
  }
};

const DeleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const checkIfAlreadyLiked = await Like.findOne({ post: id, user: userId });
    if (!checkIfAlreadyLiked)
      return res.send({ status: 403, msg: "User has not liked this post" });
    await Like.findOneAndDelete({ post: id, user: userId });
    const count = await Like.countDocuments({ post: id });
    res.send({ status: 200, msg: "Like deleted", data: count });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, msg: "An error occured" });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  getSingleUserPost,
  deletePost,
  updatePost,
  likePost,
  getAllLikes,
  getAllPostLikes,
  DeleteLike,
};
