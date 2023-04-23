const bcrypt = require('bcrypt')
const isEmail = require('validator').isEmail
const passwordValidator = require('password-validator')
const schema = (new passwordValidator()).is().min(8)

const buildMakeUser = require('./user')


const makeUser = buildMakeUser({isEmail, passwordSchema: schema, encryptPassword: bcrypt.hash })

async function main() {
    const user = await makeUser({email: "mat@gmail.com", password: "123456789"})
    console.log(user.getEmail())

}
main()
module.exports =  makeUser

