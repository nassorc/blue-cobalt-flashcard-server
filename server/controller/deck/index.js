const { listDeck, postDeck } = require('../../useCase/deck')
const makeGetDecks = require('./getDecksController')
const makeAddDeck = require('./addDeckController')

const getDecks = makeGetDecks({ listDeck })
const addDeck = makeAddDeck({ postDeck })

module.exports = {
    getDecks,
    addDeck
}