const express = require('express')
const router = express.Router()
const {createPost, getAllPost, getSinglePost, getSingleUserPost, deletePost, updatePost, likePost, DeleteLike, getAllLikes, getAllPostLikes} = require('../contollers/PostController')
const uploads = require('../middlewares/FileImage')

router.post('/api/post/:userId', uploads.single('img'), createPost)
router.get('/api/post', getAllPost)
router.get('/api/post/:id', getSinglePost)
router.get('/api/posts/:userId', getSingleUserPost)
router.delete('/api/posts/:id', deletePost)
router.put('/api/post/:id', uploads.single('img'), updatePost)
router.post('/api/like', likePost);
router.delete('/api/dislike/:id', DeleteLike);
router.get('/api/like/:id', getAllPostLikes)

module.exports = router