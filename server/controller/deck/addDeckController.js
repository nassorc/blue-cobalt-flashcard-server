const makeAddDeck = ({ postDeck }) => async (httpRequest) => {
    console.log(httpRequest)
    await postDeck({deckInfo: httpRequest.body})
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