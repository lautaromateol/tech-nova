import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/

export const SignInDtoSchema = z.object({
  email: z.string().email().min(1, {
    message: "Please insert your email."
  }),
  password: z.string().regex(passwordRegex, {
    message: "Password must have at least a lowercase, an uppercase, a number and a special character."
  })
  .min(8, {
    message: "A minimum of 8 characters is required."
  })
  .max(15, {
    message: "The maximum length is of 15 characters."
  })
})

export type SignInDto = z.infer<typeof SignInDtoSchema>