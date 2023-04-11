const makeUpdateDeck = ({ patchDeck }) => async (httpRequest) => {
    await patchDeck({deckId: httpRequest.params.id, deckInfo: httpRequest.body.details})
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
            details: "updated"
        }
    }
}

module.exports = makeUpdateDeck