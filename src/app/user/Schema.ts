import * as z from 'zod'

interface UserType {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  biography?: string
  userPhoto?: string
}

const UserSchema = z.object({
  email: z.string().email({message: "Valid email address is required"}),
  password: z.string().min(3),
  confirmPassword: z.string().min(3).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  biography: z.string().max(255).optional(),
  userPhoto: z.string().url().optional(),
})
  .refine(user => {
    if(user.confirmPassword) {
      if(user.confirmPassword != user.password) {
        return false
      }
      else {
        return true
      }
    }
    else {
      return true
    }
  }, {
    message: "Password and confirm password must match."
  })

export default UserSchema;