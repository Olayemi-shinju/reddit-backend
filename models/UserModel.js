const mongoose = require('mongoose')
const schema = mongoose.Schema

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

const User = mongoose.model('User', userSchema)
module.exports = User