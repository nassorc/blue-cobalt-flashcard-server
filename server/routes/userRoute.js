const express = require('express')
const router = express.Router()
const makeCallback = require('../expressCallback')
const {registerUser, loginUser} = require('../controller/authentication')

router.post('/register', makeCallback(registerUser))
router.post('/login', makeCallback(loginUser))


module.exports = router;