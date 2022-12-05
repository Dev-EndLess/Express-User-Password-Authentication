const express = require('express')
const router = express.Router()
const registerAuth = require('../../controllers/authController')

router.post('/', registerAuth.handleLogin)

module.exports = router
