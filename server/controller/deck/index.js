const { listDeck, postDeck, postCards, patchDeck, gradeCard, removeDeck } = require('../../useCase/deck')
const makeGetDecks = require('./getDecksController')
const makeAddDeck = require('./addDeckController')
const makeAddCards = require('./addCardsController')
const makeUpdateDeck = require('./updateDeckController')
const makeDeleteDeck = require('./deleteDeckController')
const makePostGradeCard = require('./postGradeCardController')

const getDecks = makeGetDecks({ listDeck })
const addDeck = makeAddDeck({ postDeck })
const addCards = makeAddCards({ postCards })
const updateDeck = makeUpdateDeck({ patchDeck })
const deleteDeck = makeDeleteDeck({ removeDeck })
const postGradeCard = makePostGradeCard({ gradeCard })

module.exports = {
    getDecks,
    addDeck,
    addCards,
    updateDeck,
    deleteDeck,
    postGradeCard,
}