import { IFriends } from "../models/IFriends";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export interface ISearchFriends {
    username?: string;
    status: string;
    page: number;
    size: number;
}

export interface ISearchResult {
    friends: IFriends[],
    totalItems: number,
    totalPages: number,
    currentPage: number,
}

export class FriendsAPI extends BaseAPI {
    async getFriendsByStatus(params: ISearchFriends) {
        const response = await this.GET<ISearchResult>(
            this.url(APIRoutes.friends.getFriends),
            { params }
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
