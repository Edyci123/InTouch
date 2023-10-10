import { z } from "zod";

export const requiredError = "This field is required.";

export const zAuth = z.object({
    username: z.string().min(1, { message: requiredError }),
    email: z.string().email().min(1, { message: requiredError }),
    password: z.string().min(5, {
        message: "The password should be at least 6 characters long.",
    }),
});

export type IAuth = z.infer<typeof zAuth>;

export const zLogin = zAuth.omit({ username: true });

export type ILogin = z.infer<typeof zLogin>;

export const zRegister = zAuth
    .extend({
        confirmPassword: z.string(),
    })
    .superRefine((arg, ctx) => {
        if (arg.confirmPassword !== arg.password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match!",
                path: ["confirmPassword"],
            });
        }
    });

export type IRegister = z.infer<typeof zRegister>;
