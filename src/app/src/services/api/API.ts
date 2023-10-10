import axios, { Axios } from "axios";
import { AuthAPI } from "./AuthAPI";

export class API {
    private client: Axios;

    public auth: AuthAPI;

    constructor() {
        this.client = axios.create({
            baseURL: "http://192.168.1.133:8080/api"
        })
        this.auth = new AuthAPI(this.client);
    }

    setToken(token: string) {
        this.auth.setToken(token);
    }
}

const api = new API();

export { api };