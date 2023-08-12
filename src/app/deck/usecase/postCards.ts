import Deck from '../Deck'
const makePostCards = ({}) => async ({ deckId, cardInfo }) => {
    await Deck.findOneAndUpdate(
        {_id: deckId},
        { $push: {cards: cardInfo}}
    )
    return 1
}

export default makePostCards