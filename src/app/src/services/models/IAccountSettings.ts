import z from "zod";

export const zAccount = z.object({
    snapchatUsername: z.string().optional(),
    instagramUsername: z.string().optional(),
    facebookUsername: z.string().optional(),
});

export type IAccount = z.infer<typeof zAccount>;

export const zAccountSettings = z.object({
    username: z.string().min(1, {message: "Username already used!"}),
    accounts: zAccount,
});

export type IAccountSettings = z.infer<typeof zAccountSettings>;
