import UserModel from '../Users'

export default function makeAuthenticateUser({compareHash, jwt}) {
  return async ({ userInfo }) => {
    const { email, password } = userInfo
    try {
        const user = await UserModel.findOne({email})
        if(!user) return
        const result = await compareHash(password, user.password)
        if(!result) return
        const token = jwt.sign({userId: user._id, email}, process.env.SECRET_KEY)

        return {token, userId: user._id}
    }
    catch(err) {
        throw new Error(err)
    }
  }
} 