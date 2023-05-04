const express = require('express')
const router = express.Router()
const makeCallback = require('../middleware/controllerHandler') 
const { getUser } = require('../controller/user')

router.get('/:userId', makeCallback(getUser));

module.exports = router