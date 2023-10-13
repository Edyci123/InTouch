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

    async deleteFriendship(userId: number) {
        const response = await this.DELETE(
            this.url(APIRoutes.friends.deleteFriendship, { userId })
        );
        return response;
    }

    async acceptFriendRequest(userId: number) {
        const response = await this.PATCH(
            this.url(APIRoutes.friends.acceptFriendRequest, { userId })
        );

        return response;
    }

    async sendFriendRequest(email: string) {
        const response = await this.POST(
            this.url(APIRoutes.friends.sendFriendRequests),
            { email }
        );
        return response;
    }
}
