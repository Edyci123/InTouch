import { IAuth } from "../models/IAuth";
import { IAuthToken } from "../models/IAuthToken";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    async login(data: IAuth) {
        const response = await this.POST<IAuthToken>(this.url(APIRoutes.auth.login), data)
        return response.data;
    }
}