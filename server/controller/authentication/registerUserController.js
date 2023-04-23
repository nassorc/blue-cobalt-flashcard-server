const makeRegisterUser = ({ addUser }) =>  async (httpRequest) => {

    try {
        const user = await addUser({userInfo: httpRequest.body})
        if(user) {
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: {
                    message: 'user successfully registered'
                }
            }
        }
        else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 409,
                body: {
                    message: 'email already exists'
                }
            }
        }
        

    }
    catch(err) {
        console.log(err)
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 500,
            body: {
                error: err.message
            }
        }
    }

}


module.exports = makeRegisterUser