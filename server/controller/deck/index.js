const { listDeck, postDeck, postCards, patchDeck, gradeCard } = require('../../useCase/deck')
const makeGetDecks = require('./getDecksController')
const makeAddDeck = require('./addDeckController')
const makeAddCards = require('./addCardsController')
const makeUpdateDeck = require('./updateDeckController')
const makePostGradeCard = require('./postGradeCardController')

const getDecks = makeGetDecks({ listDeck })
const addDeck = makeAddDeck({ postDeck })
const addCards = makeAddCards({ postCards })
const updateDeck = makeUpdateDeck({ patchDeck })
const postGradeCard = makePostGradeCard({ gradeCard })

module.exports = {
    getDecks,
    addDeck,
    addCards,
    updateDeck,
    postGradeCard
}