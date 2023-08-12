import Deck from '../Deck'
import mongoose from 'mongoose'
const makeListDecks = ({}) => async ({ userId }) => {
    if(!userId) throw new Error('List deck requires a user id')
    try {
        let newId = new mongoose.mongo.ObjectId(userId)
        const deckList = await Deck.find({owner: newId})
        return deckList

    }
    catch(err) {
        throw new Error(err)
    }
}
export default makeListDecks