const express = require('express')
const router = express.Router()
const makeCallback = require('../middleware/controllerHandler') 
const { getDecks, addDeck, addCards, updateDeck, postGradeCard } = require('../controller/deck')

/**
 * @api {post} /deck/ Post new Deck
 * @apiName PostDeck
 * @apiGroup Deck
 */
router.post('/', makeCallback(addDeck))

/**
 * @api {get} /deck/:id Get user decks
 * @apiName GetDeck
 * @apiGroup Deck
 * 
 * @apiParam {String} id User id
 * 
 * @apiSuccess {String} deckName Deck Name
 * @apiSuccess {[Object]} cards Array of card objects owned by user
 */
router.get('/:id', makeCallback(getDecks))

/**
 * @api {post} /deck/:id 
 * @apiName UpdateDeck /deck/:id Update user deck
 * @apiGroup Deck
 * 
 * @apiParam {String} id Deck id
 */
router.post('/:id', makeCallback(updateDeck))

router.post('/cards', makeCallback(addCards))
/**
 * @api {post} /cards/update/:id Update card
 * @apiName UpdateCard
 * @apiGroup Card
 * 
 * @apiParam {String} if Deck id
 * 
 */
// router.post('/cards/update/:id', makeCallback(updateDeck))

router.post('/cards/grade', makeCallback(postGradeCard));


module.exports = router