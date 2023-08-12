import User from '../Users'

export default function makeListUser({}) {
  return async (userId) => {
    const user = await User.findOne({ _id: userId })
    return user
  }
}