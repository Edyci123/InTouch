import z from "zod";
import { zAccount, zAccountSettings } from "./IAccountSettings";

export const zUser = z.object({
    email: z.string(),
    username: z.string(),
    account: zAccount,
});

export type IUser = z.infer<typeof zUser>;
