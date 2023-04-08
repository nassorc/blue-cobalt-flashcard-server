const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    front: {type: String},
    back: {type: String}
})
const DeckSchema = new mongoose.Schema({
    deckName: {type: String, require: true},
    owner: {type: mongoose.Schema.ObjectId, require: true},
    cards: {type: [cardSchema]},
    reviewList: {type: [mongoose.Schema.ObjectId]},
})

const Deck = new mongoose.model('decks', DeckSchema)

module.exports = Deck