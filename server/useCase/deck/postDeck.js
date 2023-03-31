const Deck = require('../../models/Deck')
const makePostDeck = ({}) => async ({deckInfo}) => {
    try {
        // console.log(deckInfo)
        const deck = new Deck(deckInfo)
        deck.save()
        return
    }
    catch(err) {
        throw new Error(err)
    }
    
}

module.exports = makePostDeck