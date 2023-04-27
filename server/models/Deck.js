const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    front: {type: String},
    back: {type: String},
    status: {type: String, default: "new"},
    interval: {type: Number, default: 0},
    repetition: {type: Number, default: 0},
    efactor: {type: Number, default: 2.5},
    createdAt: {type: Date, default: (new Date()).toISOString()},
    reviewedDate: {type: Date, default: null},
    dueDate: {type: Date, default: null},
})

const deckSettingsSchema = new mongoose.Schema({
    reviewCards: {type: Number, default: 10},
    newCards: {type: Number, default: 5},
})

const DeckSchema = new mongoose.Schema({
    deckName: {type: String, require: true},
    owner: {type: mongoose.Schema.ObjectId, required: true},
    cards: {type: [cardSchema]},
    reviewList: {type: [mongoose.Schema.ObjectId], default: []},
    deckImage: {type: String},
    deckImageName: {type: String},
    blurhash: {type: String},
    createdAt: {type: Date, default: (new Date()).toISOString()},
    tags: {type: [String]},
    deckSettings: {type: deckSettingsSchema}
})

const Deck = new mongoose.model('decks', DeckSchema)

module.exports = Deck