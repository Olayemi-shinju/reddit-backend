const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentSchema = new schema({
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: [true, 'Text is required'] },
    date_created: { type: Date, default: Date.now() }
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment
