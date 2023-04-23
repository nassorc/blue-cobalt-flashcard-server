const Deck = require('../../models/Deck');
const makeRemoveDeck = ({ }) => async ({deckId}) => {
    try {
        await Deck.deleteOne({_id: deckId});
        return
    }
    catch(err) {
        throw new Error(err.message)
    }
}
module.exports = makeRemoveDeck