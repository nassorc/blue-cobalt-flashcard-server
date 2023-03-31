// require model
const UserModel = require('../../models/Users')
const makeAddUser = ({hash}) => async ({userInfo}) => {
    if(!userInfo) throw new Error('Must provide user infomration to register a user')
    console.log(userInfo)
    const {email, password} = userInfo; 
    const hashedPassword = await hash(password, 10)
    try {
        const exist = await UserModel.findOne({email})
        if(exist) return

        const created = await UserModel.create({email, password: hashedPassword})
        return created

    }
    catch(err) {
        throw new Error(err)
    }
    
}

module.exports = makeAddUser