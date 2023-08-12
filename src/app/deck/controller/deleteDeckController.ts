const makeDeleteDeck = ({ removeDeck }) => async (httpRequest) => {
    try {
        await removeDeck({deckId: httpRequest.params.id})
    }
    catch(err) {
        throw new Error(err.message)
    }
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
            details: "deleted"
        }
    }
}

export default makeDeleteDeck