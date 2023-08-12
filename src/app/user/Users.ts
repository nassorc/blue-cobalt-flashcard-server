import mongoose, { Types } from "mongoose"
import bcrypt from "bcrypt"

// blueprint for the structure of user document
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    biography: {type: String, default: ''},
    userPhoto: {type: String, default: ''},
    decks: {type: [Types.ObjectId], default: []},
})

UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

const TeacherSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    classList: {type: [Types.ObjectId], default: []}
})

// represents the collection of the document
const UserModel = mongoose.model('users', UserSchema)

export default UserModel