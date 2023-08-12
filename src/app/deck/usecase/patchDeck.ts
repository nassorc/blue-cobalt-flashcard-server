import Deck from '../Deck'
const makePatchDeck = ({ }) => async ({deckId, deckInfo}) => {
    try {
        await Deck.findOneAndUpdate(
            {_id: deckId},
            { $set: deckInfo}
        )
    }
    catch(err) {
        throw new Error(err)
    }
    
}

export default makePatchDeck