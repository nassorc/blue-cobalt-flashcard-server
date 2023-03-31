const makeGetDecks = ({ listDeck }) => async (httpRequest) => {
    // access use case
    try {
        const deckList = await listDeck({userId: httpRequest.params.id})
        if(deckList) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: {
                    details: deckList
                }
            }
        }
    }
    catch(err) {
        throw new Error(err)
    }
    res.sendStats(200)
}

module.exports = makeGetDecks