import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

// blueprint for the structure of user document
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  biography: { type: String, default: "" },
  userPhoto: { type: String, default: "" },
  decks: { type: [Types.ObjectId], default: [], ref: "decks" },

  sessionValid: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// add function to decrypt hashed password
UserSchema.methods.compareHashPassword = async function (password: string) {
  const decoded = await bcrypt.compare(password, this.password);
  return decoded;
};

// represents the collection of the document
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
