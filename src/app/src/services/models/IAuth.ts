import { z } from "zod";
import { api } from "../api/API";

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

export const zForgotPassword = z
    .object({
        email: z.string().email(),
        password: z.string().min(5, {
            message: "The password should be at least 6 characters long.",
        }),
        confirmPassword: z.string(),
        code: z.string(),
    })
    .superRefine((arg, ctx) => {
        if (arg.confirmPassword !== arg.password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match!",
                path: ["confirmPassword"],
            });
        }
        try {
            api.auth.accountExists(arg.email);
        } catch (e) {
            ctx.addIssue({
                code: "custom",
                message: "The email is not associated to any account!",
                path: ["email"],
            });
        }
    });

export const zForgotPasswordEmail = z
    .object({
        email: z.string().email(),
    })
    .superRefine((arg, ctx) => {
        try {
            api.auth.accountExists(arg.email);
        } catch (e) {
            ctx.addIssue({
                code: "custom",
                message: "The email is not associated to any account!",
                path: ["email"],
            });
        }
    });

export type IForgotPasswordEmail = z.infer<typeof zForgotPasswordEmail>;

export type IForgotPassword = z.infer<typeof zForgotPassword>;

export type IRegister = z.infer<typeof zRegister>;
