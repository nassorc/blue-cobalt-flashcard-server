const mongoose = require('mongoose')

// blueprint for the structure of user document
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// represents the collection of the document
const UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel