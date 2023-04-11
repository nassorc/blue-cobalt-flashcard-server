const { listDeck, postDeck, postCards, patchDeck } = require('../../useCase/deck')
const makeGetDecks = require('./getDecksController')
const makeAddDeck = require('./addDeckController')
const makeAddCards = require('./addCardsController')
const makeUpdateDeck = require('./updateDeckController')

const getDecks = makeGetDecks({ listDeck })
const addDeck = makeAddDeck({ postDeck })
const addCards = makeAddCards({ postCards })
const updateDeck = makeUpdateDeck({ patchDeck })

module.exports = {
    getDecks,
    addDeck,
    addCards,
    updateDeck
}