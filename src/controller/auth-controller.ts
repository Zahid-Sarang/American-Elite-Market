import { NextFunction, Response } from "express";
import { AuthService } from "../service/auth-service";
import { Logger } from "winston";
import { CreateUserRequest } from "../types/user-types";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { HashedPassword } from "../service/hashedPassword-Service";
import { FileStorage } from "../types/storage";
import { JwtTokenService } from "../service/token-service";
import { JwtPayload } from "jsonwebtoken";

export class AuthController {
    constructor(
        private authSeervice: AuthService,
        private logger: Logger,
        private hashedPassword: HashedPassword,
        private imageStorage: FileStorage,
        private jwtTokenService: JwtTokenService,
    ) {}

    register = async (
        req: CreateUserRequest,
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

        const { userName, email, password, bio } = req.body;

        const hashedPassword = await this.hashedPassword.hashPassword(password);

        // validate profile Image path
        const profileImageLocalPath = req.file?.path;
        if (!profileImageLocalPath) {
            return next(createHttpError(400, "Please Upload Image"));
        }

        // upload image on Cloudinary
        const profileImageLink = await this.imageStorage.upload(
            profileImageLocalPath,
        );

        if (!profileImageLink || !profileImageLink.url) {
            return next(createHttpError(500, "Failed to upload image"));
        }

        const user = await this.authSeervice.createUser({
            userName,
            email,
            password: hashedPassword,
            bio,
            profileImage: profileImageLink.url,
        });
        const payload: JwtPayload = {
            sub: String(user.id),
            email: user.email,
        };

        const accessToken = this.jwtTokenService.generateAccessToken(payload);
        res.cookie("accessToken", accessToken, {
            domain: "localhost",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 60 minutes
            httpOnly: true,
        });
        res.status(201).json({ id: user._id });
    };
}
