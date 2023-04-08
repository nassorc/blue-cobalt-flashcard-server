const express = require('express')
const router = express.Router()
const makeCallback = require('../expressCallback') 
const { getDecks, addDeck, addCards } = require('../controller/deck')

/**
 * @api {get} /deck/:id Post new Deck
 * @apiName PostDeck
 * @apiGroup Deck
 * 
 * @apiParam {String} id User id
 * 
 * @apiSuccess {String} deckName Deck Name
 * @apiSuccess {[Object]} cards Array of card objects owned by user
 */
router.get('/:id', makeCallback(getDecks))
/**
 * @api {post} /deck/ Post new Deck
 * @apiName PostDeck
 * @apiGroup Deck
 */
router.post('/', makeCallback(addDeck))
router.post('/cards', makeCallback(addCards))


module.exports = router