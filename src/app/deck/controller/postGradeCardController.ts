const makePostGradeCard = ({ gradeCard }) => async (httpRequest) => {
    try {
        await gradeCard({ userId: httpRequest.body.userId, cardId: httpRequest.body.cardId, grade: httpRequest.body.grade });
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

        }
    }
}

export default makePostGradeCard