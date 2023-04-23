const makeGetDeck = ({ listDeck }) => async (httpRequest) => {
    // access use case
    try {
        const deckList = await listDeck({deckId: httpRequest.params.id})
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
}

module.exports = makeGetDeck