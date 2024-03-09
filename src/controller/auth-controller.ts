import { NextFunction, Response } from "express";
import { AuthService } from "../service/auth-service";
import { Logger } from "winston";
import { CreateUserRequest } from "../types/user-types";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export class AuthController {
    constructor(
        private authSeervice: AuthService,
        private logger: Logger,
    ) {}

    register = (req: CreateUserRequest, res: Response, next: NextFunction) => {
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

        res.status(201).json({ message: "user created successfully" });
    };
}
