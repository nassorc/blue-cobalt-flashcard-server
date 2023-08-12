import Deck from '../Deck'
const makePostDeck = ({ }) => async ({deckInfo}) => {
    try {
        const deck = new Deck(deckInfo)
        deck.save()
        return
    }
    catch(err) {
        throw new Error(err)
    }
    
}

export default makePostDeck