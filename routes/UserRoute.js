const express = require('express')
const router = express.Router()
const {createUser, LoginUser, getAllUser, updateUser, deleteUser, getSingleUser} = require('../contollers/UsersContoller')
const uploads = require('../../backend/middlewares/FileImage')
router.post('/api/user', createUser)
router.post('/api/user/login', LoginUser)
router.get('/api/users', getAllUser)
router.put('/api/:id', uploads.single('avatar'), updateUser)
router.delete('/api/user/:id', deleteUser)
router.get('/api/user/get/:id', getSingleUser)


module.exports = router