const User = require('../../models/Users')
const makeListUser = ({}) => async (userId) => {
    const user = await User.findOne({ _id: userId })
    return user
}
module.exports =  makeListUser