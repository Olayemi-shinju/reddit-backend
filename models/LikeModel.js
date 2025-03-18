const mongoose =require('mongoose')
const Schema = mongoose.Schema


const likeSchema = new Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  const Like = mongoose.model('Like', likeSchema);
  module.exports = Like