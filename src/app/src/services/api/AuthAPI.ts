import { IAccountSettings } from "../models/IAccountSettings";
import { IForgotPassword, ILogin, IRegister } from "../models/IAuth";
import { IAuthToken } from "../models/IAuthToken";
import { IUser } from "../models/IUser";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    async me() {
        const response = await this.GET<IUser>(this.url(APIRoutes.auth.me));
        return response.data;
    }

    async accountExists(email: string) {
        const response = await this.POST(
            this.url(APIRoutes.auth.accountExists),
            { email }
        );
        return response;
    }

    async updateAccounts(data: IAccountSettings) {
        const response = await this.PATCH(
            this.url(APIRoutes.auth.updateAccounts),
            data
        );
        return response;
    }

    async login(data: ILogin) {
        const response = await this.POST<IAuthToken>(
            this.url(APIRoutes.auth.login),
            data
        );
        return response.data;
    }

    async resetCode(email: string) {
        const response = await this.POST(this.url(APIRoutes.auth.resetCode), {
            email,
        });
        return response;
    }

    async resetPassword(data: IForgotPassword) {
        const response = await this.POST(this.url(APIRoutes.auth.resetPassword), data);
        return response;
    }

    async register(data: IRegister) {
        const response = await this.POST(
            this.url(APIRoutes.auth.register),
            data
        );
        return response;
    }
}
