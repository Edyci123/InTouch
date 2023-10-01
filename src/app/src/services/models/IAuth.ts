import { z } from "zod";

export const requiredError = "This field is required."

const passwordRegex = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";

export const zAuth = z.object({
    email: z.string().email().min(1, {message: requiredError}),
    password: z.string().regex(RegExp(passwordRegex)),
})

export type IAuth = z.infer<typeof zAuth>;
