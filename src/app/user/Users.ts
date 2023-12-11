import mongoose, { Types } from "mongoose"
import bcrypt from "bcrypt"

// blueprint for the structure of user document
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    biography: {type: String, default: ''},
    profileImage: {type: String, default: ''},
    decks: {type: [{type: Types.ObjectId, ref: 'decks'}], default: []},

    sessionValid: {type: Boolean, default: false},
})

// encrypt password before saving
UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})
// add function to decrypt hashed password
UserSchema.methods.compareHashPassword = async function(password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}


const TeacherSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    classList: {type: [Types.ObjectId], default: []}
})

// represents the collection of the document
const UserModel = mongoose.model('users', UserSchema)

export default UserModel