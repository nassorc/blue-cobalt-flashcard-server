const language = require('@google-cloud/language')
const path = require('path')
const {supermemo} = require('supermemo')

const makeListDeck = require('./listDeck')
const makePostDeck = require('./postDeck')
const makePostCards = require('./postCards')
const makePatchDeck = require('./patchDeck')
const makeRemoveDeck = require('./removeDeck')
const makeGradeCard = require('./gradeCard')

const { Configuration, OpenAIApi } = require("openai");

const listDeck = makeListDeck({})
const postDeck = makePostDeck({})
const postCards = makePostCards({})
const patchDeck = makePatchDeck({})
const removeDeck = makeRemoveDeck({})
const gradeCard = makeGradeCard({ practice: supermemo })

module.exports = {
    listDeck,
    postDeck,
    postCards,
    patchDeck,
    gradeCard,
    removeDeck,
}
