const language = require('@google-cloud/language');
const path = require('path')
const makeListDeck = require('./listDeck')
const makePostDeck = require('./postDeck')
const makePostCards = require('./postCards')

const { Configuration, OpenAIApi } = require("openai");

const listDeck = makeListDeck({})
const postDeck = makePostDeck({})
const postCards = makePostCards({})

module.exports = {
    listDeck,
    postDeck,
    postCards
}
