const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
} = require('../controllers/UsersController');
const uploads = require('../../backend/middlewares/FileImage');

router.post('/api/users', createUser);
router.post('/api/users/login', loginUser);
router.get('/api/users', getAllUsers);
router.put('/api/users/:id', uploads.single('avatar'), updateUser);
router.delete('/api/users/:id', deleteUser);
router.get('/api/users/get/:id', getSingleUser);

module.exports = router;
