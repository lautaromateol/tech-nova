import { z } from 'zod'

export const CreateUserDtoSchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(80, { message: "Name must be at most 80 characters long" }),
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Password must have at least a lowercase, an uppercase, a number and a special character."
    }),
  confirmPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message: "Password must have at least a lowercase, an uppercase, a number and a special character."
    }),
  address: z.string()
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(80, { message: "Address must be at most 80 characters long" })
    .optional(),
  phone: z.number()
    .int({ message: "Phone number must be an integer" })
    .positive({ message: "Phone number must be a positive number" })
    .optional(),
  country: z.string()
    .min(5, { message: "Country must be at least 5 characters long" })
    .max(20, { message: "Country must be at most 20 characters long" })
    .optional(),
  city: z.string()
    .min(5, { message: "City must be at least 5 characters long" })
    .max(20, { message: "City must be at most 20 characters long" })
    .optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>