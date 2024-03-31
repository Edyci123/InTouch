import { Axios, AxiosHeaders, AxiosRequestConfig } from "axios";
import _ from "lodash";

export type APIConfig = {
    baseUrl?: string;
    basePrefix: string;
    ensureTrailingSlash: boolean;
    params?: {
        id: string;
        page: number;
        size: number;
    };
};

export class BaseAPI {
    token: string | null = null;

    private config: APIConfig;

    constructor(public client: Axios, config?: APIConfig) {
        this.config = {
            ...{
                basePrefix: "",
                ensureTrailingSlash: false,
            },
            ...config,
        };
    }

    setToken(token: string): void {
        this.token = token;
    }

    headers(overwrite?: Record<string, string>): AxiosHeaders {
        const headers = new AxiosHeaders({
            "Content-Type": "application/json",
        });
        const token = this.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers.concat(overwrite);
    }

    url(template: string, vars?: Record<string, string | number>): string {
        const tpl = _.template(template, {
            interpolate: /{{([\s\S]+?)}}/g,
        });
        let url = `${tpl(vars)}`;
        if (this.config.ensureTrailingSlash && !url.endsWith("/")) {
            url = url + "/";
        }
        if (url.startsWith("/")) {
            url = url.slice(1);
        }
        return url;
    }

    async GET<Response>(url: string, config: AxiosRequestConfig = {}) {
        const response = await this.client.get<Response>(url, {
            ...config,
            headers: this.headers(),
        });
        return response;
    }

    async POST<Response, RequestData = object | null>(
        url: string,
        data: RequestData | null = null,
        config: AxiosRequestConfig = {}
    ) {
        const response = await this.client.post<Response>(url, data, {
            headers: this.headers(),
            ...config,
        });
        return response;
    }

    async PUT<Response, RequestData = object | null>(
        url: string,
        data: RequestData | null,
        config: AxiosRequestConfig = {}
    ) {
        const response = await this.client.put<Response>(url, data, {
            ...config,
            headers: this.headers(),
        });
        return response;
    }

    async PATCH<Response, RequestData = object | null>(
        url: string,
        data?: RequestData | null,
        config: AxiosRequestConfig = {}
    ) {
        const response = await this.client.patch<Response>(url, data, {
            ...config,
            headers: this.headers(),
        });
        return response;
    }

    async DELETE<Response>(url: string, config: AxiosRequestConfig = {}) {
        const response = await this.client.delete<Response>(url, {
            ...config,
            headers: this.headers(),
        });
        return response;
    }
}
