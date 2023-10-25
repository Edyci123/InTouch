import { z } from "zod";

export const requiredError = "This field is required.";

export const zAuth = z.object({
    email: z.string().email().min(1, { message: requiredError }),
    password: z.string().min(5, {
        message: "The password should be at least 6 characters long.",
    }),
});

export type IAuth = z.infer<typeof zAuth>;

export const zLogin = zAuth;

export type ILogin = z.infer<typeof zLogin>;

export const zRegister = zAuth;

export type IRegister = z.infer<typeof zRegister>;
