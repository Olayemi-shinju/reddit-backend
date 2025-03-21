const express = require('express')
const router = express.Router()
const {createUser, LoginUser, getAllUser, updateUser, deleteUser, getSingleUser} = require('../contollers/UsersContoller')
const uploads = require('../middlewares/FileImage')
const uploadMiddleware = require('../middlewares/FileImage')
router.post('/api/user', createUser)
router.post('/api/user/login', LoginUser)
router.get('/api/users', getAllUser)
router.put('/api/:id', uploadMiddleware, updateUser)
router.delete('/api/user/:id', deleteUser)
router.get('/api/user/get/:id', getSingleUser)

module.exports = router