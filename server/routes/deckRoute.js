const express = require('express')
const router = express.Router()
const makeCallback = require('../expressCallback') 
const { getDecks, addDeck } = require('../controller/deck')

router.get('/:id', makeCallback(getDecks))
router.post('/', makeCallback(addDeck))

module.exports = router