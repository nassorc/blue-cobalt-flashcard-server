const Deck = require('../../models/Deck')
const makePostDeck = ({ }) => async ({deckInfo}) => {
    try {
        if(deckInfo.text.length > 0) {
        }
        await buildDeck()
        const deck = new Deck(deckInfo)
        deck.save()
        return
    }
    catch(err) {
        throw new Error(err)
    }
    
}

module.exports = makePostDeck