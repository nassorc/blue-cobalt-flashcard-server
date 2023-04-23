const makeAddCards = ({ postCards }) => async (httpRequest) => {
    await postCards({deckId: httpRequest?.body?.deckId, cardInfo: httpRequest?.body?.cards})
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
        }
    }
}

module.exports = makeAddCards