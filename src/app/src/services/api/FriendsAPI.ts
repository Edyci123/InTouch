import { IFriends } from "../models/IFriends";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class FriendsAPI extends BaseAPI {
    async getFriendsByStatus(status: string) {
        const response = await this.GET<{ friends: IFriends[] }>(
            this.url(APIRoutes.friends.getByStatus, { status })
        );
        return response.data;
    }
}
