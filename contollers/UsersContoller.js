const Comment = require("../models/CommentModel");
const post = require("../models/PostModel");
const User = require("../models/UserModel");

const createUser = async (req, res) => {
  try {
    const { fullname, email, gender, password } = req.body;
    const new_user = { fullname, email, gender, password };
    const resp = await User(new_user).save();
    const user_detail = {
      fullname: resp.fullname,
      email: resp.email,
      gender: resp.gender,
    };
    res.send({
      status: 200,
      msg: "User Created Successfully",
      data: user_detail,
    });
  } catch (error) {
    res.send({ status: 500, msg: "An Error Occured" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    if (!user || !(await user.comparePassword(password)))
      return res.send({
        status: 404,
        msg: "Invalid Email Or Password",
      });
    const user_detail = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      gender: user.gender,
      description: user.description,
      background_img: user.background_img,
      avatar: user.avatar,
      isLogIn: true,
    };

    res.send({
      status: 200,
      msg: "User Logged In Successful",
      data: user_detail,
    });
  } catch (error) {}
};

const getAllUser = async (req, res) => {
  try {
    const resp = await User.find(
      {},
      {
        fullname: 1,
        description: 1,
        gender: 1,
        email: 1,
        avatar: 1,
        background_img: 1,
      }
    );
    res.send({
      status: 200,
      data: resp,
    });
  } catch (error) {
    res.send({ status: 400, msg: "An Error ocurred" });
  }
};


const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findClass = await User.findById(id);
    if (!findClass) return res.send({ status: 404, msg: "User Not Found" });

    const update = await User.findByIdAndUpdate(id, {
      $set: {
        ...req.body, // Update all fields from req.body
        avatar: req.file?.path, // Update avatar field with file path
      },
    }, { new: true });

    res.send({ status: 200, msg: "User Data Updated Successfully", data: update });
  } catch (error) {
    console.error(error);
    res.send({ status: 500, msg: "An Error Occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await Comment.deleteMany({ user: userId });
    await post.deleteMany({ user: userId });
    const resp = await User.findByIdAndDelete(userId);
    const update_user = {
      fullname: resp.fullname,
      email: resp.email,
      gender: resp.gender,
    };
    res.send({
      status: 200,
      msg: "User Deleted Successfully",
      data: update_user,
    });
  } catch (error) {
    res.send({
      status: 500,
      msg: "An Error Ocurred",
    });
  }
};



const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findAdmin = await User.findById(id);
    if (!findAdmin) return res.send({ status: 404, msg: "User Not Found" });
    res.send({ status: 200, data: findAdmin });
  } catch (error) {
    res.send({ status: 500, msg: "An Error Occurred" });
  }
};


module.exports = { createUser, LoginUser, getAllUser, updateUser, deleteUser, getSingleUser };
