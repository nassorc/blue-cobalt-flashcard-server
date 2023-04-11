const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    front: {type: String},
    back: {type: String},
    status: {type: String},
    interval: {type: Number, default: 0},
    repetition: {type: Number, default: 0},
    efactor: {type: Number, default: 2.5},
    reviewedDate: {type: Date},
    dueDate: {type: Date},
    deltaDays: {type: Date},
})
const DeckSchema = new mongoose.Schema({
    deckName: {type: String, require: true},
    owner: {type: mongoose.Schema.ObjectId, require: true},
    cards: {type: [cardSchema]},
    reviewList: {type: [mongoose.Schema.ObjectId]},
    deckImage: {type: String},
    creationDate: {type: Date},
    tags: {type: [String]},
})

const Deck = new mongoose.model('decks', DeckSchema)

module.exports = Deck