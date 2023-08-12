import createResponse from "../../../utils/createResponse"

export default function makeCreateUser({ addUser }) {
  return async (httpRequest) => {
    try {
        const user = await addUser({userInfo: httpRequest.body})
        return createResponse(201, {
          message: 'user successfully created'
        })
        // if(user) {
        //     return {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         statusCode: 201,
        //         body: {
        //             message: 'user successfully registered'
        //         }
        //     }
        // }
        // else {
        //     return {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         statusCode: 409,
        //         body: {
        //             message: 'email already exists'
        //         }
        //     }
        // }
        

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
}