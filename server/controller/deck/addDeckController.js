const makeAddDeck = ({ postDeck }) => async (httpRequest) => {
    let newDeck = httpRequest.body.details;
    newDeck.owner = httpRequest.body.userId;
    console.log(newDeck)
    try {
        await postDeck({deckInfo: newDeck})
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 201,
            body: {
                details: "posted"
            }
        }
    }
    catch(err) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 409,
            body: {
                details: err.message
            }
        }
    }
}

module.exports = makeAddDeck