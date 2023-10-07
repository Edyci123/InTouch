import z from "zod";

export const zAccountSettings = z.object({
    snapchatUsername: z.string(),
    instagramUsername: z.string(),
    facebookUsername: z.string(),
});

export type IAccountSettings = z.infer<typeof zAccountSettings>;
