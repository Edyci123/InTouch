import z from "zod";
import { zAccount } from "./IAccountSettings";

export enum FriendshipStatus {
    pending = "PENDING",
    accepted = "ACCEPTED",
    sent = "SENT",
}

export const zFriendshipStatus = z.nativeEnum(FriendshipStatus);

export const zFriends = z.object({
    id: z.number(),
    email: z.string(),
    username: z.string(),
    status: zFriendshipStatus,
    accounts: zAccount,
    photoUri: z.string(),
});

export type IFriends = z.infer<typeof zFriends>;
