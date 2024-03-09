export interface FileData {
    fileName: string;
    fileData: ArrayBuffer;
}

export interface CloudinaryUploadResponse {
    url: string;
    // Add other properties if needed
}

export interface FileStorage {
    upload(localFilePath: string): Promise<CloudinaryUploadResponse>;
    delete(fileName: string): void;
}
