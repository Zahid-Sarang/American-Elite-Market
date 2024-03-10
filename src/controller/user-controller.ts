import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { AuthRequest, UpdateUserRequest } from "../types/user-types";
import { FileStorage } from "../types/storage-types";
import { Logger } from "winston";

export class UserController {
    constructor(
        private userService: UserService,
        private imageStorage: FileStorage,
        private logger: Logger,
    ) {}

    // Update User Method
    updateUser = async (
        req: UpdateUserRequest,
        res: Response,
        next: NextFunction,
    ) => {
        // validate the request Data
        const requestValidationError = validationResult(req);
        if (!requestValidationError.isEmpty()) {
            return next(
                createHttpError(
                    400,
                    requestValidationError.array()[0].msg as string,
                ),
            );
        }

        const { userName, bio } = req.body;
        const authReq = req as AuthRequest;

        // check if user already exists
        const isUserExists = await this.userService.findById(authReq.auth.sub);
        if (!isUserExists) {
            return next(createHttpError(400, "User Not Found!"));
        }

        let imageUrl = isUserExists.profileImage;

        // validate profile image path
        const profileImageLocalPath = req.file?.path;
        if (profileImageLocalPath) {
            // upload image on cloudinary
            const profileImageLink = await this.imageStorage.upload(
                profileImageLocalPath,
            );

            if (!profileImageLink || !profileImageLink.url) {
                return next(createHttpError(500, "Failed to upload image"));
            }
            // delete previous image from cloudinary
            this.imageStorage.delete(imageUrl!);
            imageUrl = profileImageLink.url;
        }

        const user = await this.userService.updateById(authReq.auth.sub, {
            userName,
            bio,
            profileImage: imageUrl,
        });

        res.json(user);
    };

    // Get All Users Method
    getAllUsers = async (req: Request, res: Response) => {
        const allUsers = await this.userService.getUsers();
        res.json(allUsers);
    };

    // Get Only One User Method
    getOneUser = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        if (!userId) {
            next(createHttpError(400, "Invalid userId!"));
        }
        const user = await this.userService.findById(userId);
        if (!user) {
            next(createHttpError(400, "User does not exist!"));
            return;
        }
        res.json(user);
    };
}
