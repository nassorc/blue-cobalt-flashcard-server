import express from 'express'
import makeCallback from '../../middleware/controllerHandler'
const router = express.Router()
import { 
  getDeck, 
  getDecks, 
  addDeck, 
  addCards, 
  updateDeck, 
  postGradeCard, 
  deleteDeck
} from './controller'

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

router.get('/get/:id', makeCallback(getDeck))
/**
 * @api {post} /deck/:id 
 * @apiName UpdateDeck /deck/:id Update user deck
 * @apiGroup Deck
 * 
 * @apiParam {String} id Deck id
 */
router.post('/update/:id', makeCallback(updateDeck))

router.post('/delete/:id', makeCallback(deleteDeck))

// Card routes

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

export default router;