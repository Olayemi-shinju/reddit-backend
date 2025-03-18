const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
     user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
     title: { type: String, required: true },
     body: { type: String, default: null },
     img: { type: String, default: null },
     url: { type: String, default: null },
     likes: { type: Number, default: 0 },
     dislikes: { type: Number, default: 0 },
     date_created: { type: String, default: Date.now()},
     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Add this line
 });
 

 const post = mongoose.model('Post', postSchema)
 module.exports = post;