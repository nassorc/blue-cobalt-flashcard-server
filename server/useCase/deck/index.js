const makeListDeck = require('./listDeck')
const makePostDeck = require('./postDeck')

const listDeck = makeListDeck({})
const postDeck = makePostDeck({})

module.exports = {
    listDeck,
    postDeck,
}