import fs from "fs";
import createHttpError from "http-errors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResponse, FileStorage } from "../types/storage-types";
import { Config } from "../config";

cloudinary.config({
    cloud_name: Config.CLOUD_NAME as string,
    api_key: Config.API_KEY as string,
    api_secret: Config.API_SECRET as string,
});
export class CloudinaryStorage implements FileStorage {
    async upload(localFilePath: string): Promise<CloudinaryUploadResponse> {
        if (!localFilePath) {
            const error = createHttpError(400, "Please include a file path!");
            throw error;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localFilePath);
        return response;
    }
    async delete(imageUrl: string | undefined): Promise<void> {
        if (!imageUrl) {
            return;
        }
        const cloudinaryUrlParts = imageUrl.split("/");
        const filenameWithExtension =
            cloudinaryUrlParts[cloudinaryUrlParts.length - 1];

        const publicId = filenameWithExtension.split(".")[0];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await cloudinary.uploader.destroy(publicId);
    }
}
