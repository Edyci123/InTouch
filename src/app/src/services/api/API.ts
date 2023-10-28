import axios, { Axios } from "axios";
import { AuthAPI } from "./AuthAPI";
import { FriendsAPI } from "./FriendsAPI";
import { FilesAPI } from "./FilesAPI";

export class API {
    private client: Axios;

    public auth: AuthAPI;
    public friends: FriendsAPI;
    public files: FilesAPI;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8080/api",
        });
        this.auth = new AuthAPI(this.client);
        this.friends = new FriendsAPI(this.client);
        this.files = new FilesAPI(this.client);
    }

    setToken(token: string) {
        this.auth.setToken(token);
        this.friends.setToken(token);
        this.files.setToken(token);
    }
}

const api = new API();

export { api };
