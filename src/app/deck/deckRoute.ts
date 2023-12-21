import express from "express";
import makeCallback from "../../middleware/controllerHandler";
const router = express.Router();
import {
  getOneDeckHandler,
  getManyDecksHandler,
  addDeckHandler,
  updateDeckHandler,
  deleteDeckHandler,
  gradeCardHandler,
  addCardsHandler,
} from "./deck-controllers";

/**
 * @api {post} /deck/ Post new Deck
 * @apiName PostDeck
 * @apiGroup Deck
 */
router.post("/", makeCallback(addDeckHandler));

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
router.get("/:id", makeCallback(getManyDecksHandler));

router.get("/get/:id", makeCallback(getOneDeckHandler));
/**
 * @api {post} /deck/:id
 * @apiName UpdateDeck /deck/:id Update user deck
 * @apiGroup Deck
 *
 * @apiParam {String} id Deck id
 */
router.post("/update/:id", makeCallback(updateDeckHandler));

router.post("/delete/:id", makeCallback(deleteDeckHandler));

// Card routes

router.post("/cards", makeCallback(addCardsHandler));
/**
 * @api {post} /cards/update/:id Update card
 * @apiName UpdateCard
 * @apiGroup Card
 *
 * @apiParam {String} if Deck id
 *
 */
// router.post('/cards/update/:id', makeCallback(updateDeck))

router.post("/cards/grade", makeCallback(gradeCardHandler));

export default router;
