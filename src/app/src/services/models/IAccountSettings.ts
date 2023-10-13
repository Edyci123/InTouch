import z from "zod";

export const zAccount = z.object({
    snapchatUsername: z.string(),
    instagramUsername: z.string(),
    facebookUsername: z.string(),
});

export type IAccount = z.infer<typeof zAccount>;

export const zAccountSettings = z.object({
    username: z.string(),
    account: zAccount,
});

export type IAccountSettings = z.infer<typeof zAccountSettings>;
