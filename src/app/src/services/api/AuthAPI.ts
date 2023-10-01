import { IAuthToken } from "../models/IAuthToken";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    async login(email: string, password: string) {
        return await this.POST<IAuthToken>(this.url(APIRoutes.auth.login), {email, password})
    }
}