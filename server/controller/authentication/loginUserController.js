const makeLoginUser = ({authenticateUser}) => async (httpRequest) => {
    const user = await authenticateUser({userInfo: httpRequest.body})
    if(user) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: {
                message: 'logged in successfully',
                details: user
            }
        }
    }
    else {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 401 ,
            body: {
                message: 'incorrect email or password'
            }
        }
    }
}

module.exports = makeLoginUser