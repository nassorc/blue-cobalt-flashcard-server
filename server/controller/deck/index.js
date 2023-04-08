const { listDeck, postDeck, postCards } = require('../../useCase/deck')
const makeGetDecks = require('./getDecksController')
const makeAddDeck = require('./addDeckController')
const makeAddCards = require('./addCardsController')

const getDecks = makeGetDecks({ listDeck })
const addDeck = makeAddDeck({ postDeck })
const addCards = makeAddCards({ postCards })

module.exports = {
    getDecks,
    addDeck,
    addCards
}