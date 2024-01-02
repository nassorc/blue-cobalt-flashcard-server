import * as z from "zod";

export const UserSchema = z
  .object({
    email: z.string().email({ message: "Valid email address is required" }),
    password: z.string().min(3),
    confirmPassword: z.string().min(3).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    biography: z.string().max(255).optional(),
    userPhoto: z.string().url().optional(),
  })
  .refine(
    (user) => {
      if (user.confirmPassword) {
        if (user.confirmPassword != user.password) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    {
      message: "Password and confirm password must match.",
    }
  );

export const LoginInputSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
export type UserType = z.infer<typeof UserSchema>;
export type LoginInputType = Pick<UserType, "email" | "password">;
export type CreateUserInputType = Pick<UserType, "email" | "password">;
