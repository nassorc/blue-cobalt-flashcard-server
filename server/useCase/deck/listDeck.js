const Deck = require('../../models/Deck')
const mongoose = require('mongoose')
const makeListDeck = ({}) => async ({ deckId } = {}) => {

    if(!deckId) throw new Error('List deck requires a user id')
    try {
        let id = new mongoose.mongo.ObjectId(deckId)
        const deckList = await Deck.findOne({_id: id})
        return deckList
    }
    catch(err) {
        throw new Error(err)
    }
}
module.exports = makeListDeck