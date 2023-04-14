const makeAddDeck = ({ postDeck }) => async (httpRequest) => {
    try {
        await postDeck({deckInfo: httpRequest.body})
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
            details: "posted"
        }
    }
}

module.exports = makeAddDeck