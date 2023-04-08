const Deck = require('../../models/Deck')
const makePostCards = ({}) => async ({ deckId, cardInfo }) => {
    await Deck.findOneAndUpdate(
        {_id: deckId},
        { $push: {cards: cardInfo}}
    )
    return 1
}

module.exports = makePostCards