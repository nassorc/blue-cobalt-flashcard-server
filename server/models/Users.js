const mongoose = require('mongoose')

// blueprint for the structure of user document
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    Biography: {type: String, default: ''},
    userPhoto: {type: String, default: ''},
    decks: {type: [mongoose.Schema.ObjectId], default: []},
})

const TeacherSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, required: true},
    classArray: {type: [mongoose.Schema.ObjectId], default: []}
})

// represents the collection of the document
const UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel