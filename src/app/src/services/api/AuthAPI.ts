import { ILogin, IRegister } from "../models/IAuth";
import { IAuthToken } from "../models/IAuthToken";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    async login(data: ILogin) {
        const response = await this.POST<IAuthToken>(
            this.url(APIRoutes.auth.login),
            data
        );
        return response.data;
    }

    async register(data: IRegister) {
        const response = await this.POST(
            this.url(APIRoutes.auth.register),
            data
        );
        return response;
    }
}
