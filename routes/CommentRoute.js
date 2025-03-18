const express = require('express');
const router = express.Router();
const { createComment, getAllComment, getSinglePostComment, getSingleUserComment, deleteComment } = require('../contollers/CommentController');
router.post('/api/comment/:postId', createComment);
router.get('/api/comments/:id', getSinglePostComment);
router.get('/api/comments', getAllComment);
router.get('/api/comment/:userId', getSingleUserComment);
router.delete('/api/comment/:id', deleteComment)

module.exports = router;
