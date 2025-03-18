const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSchema = new schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, char: 14},
    created_at: {type: Date, default: Date.now()},
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin