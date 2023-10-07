import z from "zod";
import { zAccountSettings } from "./IAccountSettings";

export const zUser = z.object({
    email: z.string(),
    account: zAccountSettings,
});

export type IUser = z.infer<typeof zUser>;
