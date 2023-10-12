import z from "zod";

export enum FriendshipStatus {
    pending = "pending",
    accepted = "accepted",
    sent = "sent",
}

export const zFriendshipStatus = z.nativeEnum(FriendshipStatus);

export const zFriends = z.object({
    id: z.number(),
    email: z.string(),
    status: zFriendshipStatus,
});

export type IFriends = z.infer<typeof zFriends>
