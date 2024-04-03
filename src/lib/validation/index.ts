import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(3,'Too Short'),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8,"Password Must Be At Least Of 8 Characters!")
  })
export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,"Password Must Be At Least Of 8 Characters!")
  })
export const PostValidation = z.object({
    caption : z.string().min(5).max(2200),
    file : z.custom<File[]>(),
    location : z.string().min(2).max(100),
    tags : z.string()
  })