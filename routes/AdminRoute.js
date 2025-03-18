const express = require('express')
const router = express.Router()
const {createAdmin, getAllAdmin, LoginAdmin, updateAdmin, getSingleAdmin} = require('../contollers/AdminController')


router.post('/api/admin', createAdmin)
router.get('/api/admins', getAllAdmin)
router.post('/api/login/admin', LoginAdmin)
router.put('/api/update/:id', updateAdmin)
router.get('/api/get/:id', getSingleAdmin)
module.exports = router