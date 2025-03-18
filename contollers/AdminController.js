const Admin = require("../models/AdminModel");
const createAdmin = async (req, res) => {
  try {
    const { fullname, password, email, phone } = req.body;
    const new_user = { fullname, password, email, phone };
    const resp = await Admin(new_user).save();
    const admin_detail = {
      fullname: resp.fullname,
      email: resp.email,
      phone: resp.phone,
      password: resp.password,
    };

    res.send({
      status: 200,
      msg: "Admin Created Successfully",
      data: admin_detail,
    });
  } catch (error) {
    res.send({
      status: 500,
      msg: "An Error Occured",
    });
  }
};
const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email, password });
    if (!user)
      return res.send({
        status: 404,
        msg: "Invalid Email Or Password",
      });
    const user_detail = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      phone: user.phone,
    };

    res.send({
      status: 200,
      msg: "Admin Logged In Successful",
      data: user_detail,
    });
  } catch (error) {
    res.send({
      status: 500,
      msg: "An Error Occured",
    });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const resp = await Admin.find();
    res.send({
      status: 200,
      data: resp,
    });
  } catch (error) {
    res.send({ status: 400, msg: "An Error ocurred" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const findAdmin = await Admin.findById(id);

    if (!findAdmin) return res.send({ status: 400, msg: "Admin Not Found" });

    const update = await Admin.findByIdAndUpdate(id, req.body, { new: true });

    res.send({ status: 200, msg: "Admin Updated Successfully", data: update });
  } catch (error) {
    res.send({ status: 500, msg: "An Error Occured" });
  }
};

const getSingleAdmin = async(req, res)=>{
  try {
    const id = req.params.id;
    const findAdmin = await Admin.findById(id);
    if (!findAdmin) return res.send({ status: 400, msg: "Admin Not FOund"})
      res.send({ status: 200, data: findAdmin });
  } catch (error) {
    res.send({ status: 500, msg: "An Error Occured" });
    
  }
}

module.exports = { createAdmin, getAllAdmin, LoginAdmin, updateAdmin, getSingleAdmin };
