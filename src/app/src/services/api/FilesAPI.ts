import { AxiosHeaders } from "axios";
import { IFriends } from "../models/IFriends";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class FilesAPI extends BaseAPI {
    async uploadFile(file: FormData) {
        const response = await this.client.post(
            "http://192.168.1.133:8080/api" + APIRoutes.files.upload,
            file,
            {
                headers: new AxiosHeaders({
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.token}`,
                }),
            }
        );

        return response;
    }
}

// headers: {
//     'content-type': 'multipart/form-data'
// }
