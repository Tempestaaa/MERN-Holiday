import { z } from "zod";

// USER DATA
export const UserData = z.object({
  _id: z.string(),
  email: z.string().email().min(1, { message: "Required" }),
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  password: z.string().min(6, { message: "Password minimum 6 characters" }),
});
export type User = z.infer<typeof UserData>;

// USER REGISTER
export const UserDataRegister = UserData.omit({ _id: true })
  .extend({
    confirm: z
      .string()
      .min(6, { message: "Confirm password minimum 6 characters" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password do not match",
    path: ["confirm"],
  });
export type UserRegister = z.infer<typeof UserDataRegister>;

// USER LOGIN
export const UserDataLogin = UserData.pick({ email: true, password: true });
export type UserLogin = z.infer<typeof UserDataLogin>;
