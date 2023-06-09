const {supermemo} = require('supermemo')

const makeListDecks = require('./listDecks')
const makeListDeck = require('./listDeck')
const makePostDeck = require('./postDeck')
const makePostCards = require('./postCards')
const makePatchDeck = require('./patchDeck')
const makeRemoveDeck = require('./removeDeck')
const makeGradeCard = require('./gradeCard')

const listDecks = makeListDecks({})
const listDeck = makeListDeck({}) 
const postDeck = makePostDeck({})
const postCards = makePostCards({})
const patchDeck = makePatchDeck({})
const removeDeck = makeRemoveDeck({})
const gradeCard = makeGradeCard({ practice: supermemo })

module.exports = {
    listDecks,
    listDeck,
    postDeck,
    postCards,
    patchDeck,
    gradeCard,
    removeDeck,
}
