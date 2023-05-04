const MakeGetUser = ({ listUser }) => async (httpRequest) => {
    const user = await listUser(httpRequest.params.userId)
    // user found
    if(user) { 
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: {
                details: user
            }
        }
    }
    else {
        // user does not exist
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 404,
            body: {
                details: [] 
            }
        }
    }
} 
module.exports = MakeGetUser