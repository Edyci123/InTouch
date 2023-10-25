import axios, { Axios } from "axios";
import { AuthAPI } from "./AuthAPI";
import { FriendsAPI } from "./FriendsAPI";

export class API {
    private client: Axios;

    public auth: AuthAPI;
    public friends: FriendsAPI;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8080/api",
        });
        this.auth = new AuthAPI(this.client);
        this.friends = new FriendsAPI(this.client);
    }

    setToken(token: string) {
        this.auth.setToken(token);
        this.friends.setToken(token);
    }
}

const api = new API();

export { api };
