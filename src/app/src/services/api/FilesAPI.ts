import { IFriends } from "../models/IFriends";
import { APIRoutes } from "./APIRoutes";
import { BaseAPI } from "./BaseAPI";

export class FilesAPI extends BaseAPI {
    async uploadFile(file: FormData) {
        const response = await this.POST(
            this.url(APIRoutes.files.upload),
            file
        );

        return response;
    }
}
