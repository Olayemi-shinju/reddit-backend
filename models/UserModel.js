const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const userSchema = new schema({
    fullname: {type: String, required: [true, 'Full Name Required']},
    email: {type: String, required: [true, 'Email Required'], unique: true},
    password: {type: String, required: [true, 'Password Required']},
    gender: {type: String, required: [true, 'Gender Required']},
    avatar: {type: String, default: null},
    background_img: {type: String, default: null},
    description: {type: String, default: null},
    date_created: {type: Date, default: Date.now()}
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User', userSchema)
module.exports = User