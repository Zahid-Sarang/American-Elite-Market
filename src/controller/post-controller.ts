import { NextFunction, Response } from "express";
import { PostRequest } from "../types/post-types";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { AuthRequest } from "../types/user-types";
import { PostService } from "../service/post-service";
import { Logger } from "winston";
import { UserService } from "../service/user-service";

export class PostController {
    constructor(
        private postService: PostService,
        private userService: UserService,
        private logger: Logger,
    ) {}

    createPost = async (
        req: PostRequest,
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

        const { content } = req.body;
        const userId = (req as AuthRequest).auth.sub;
        const user = await this.userService.findById(userId);
        if (!user) {
            return next(createHttpError(400, "User Not Found!"));
        }
        const post = await this.postService.create(user, { content });
        res.status(201).json({ id: post._id as string });
    };

    // updatePost = (req: PostRequest, res: Response, next: NextFunction) => {};
    // getAllPost = (req: PostRequest, res: Response) => {};
    // getOnePost = (req: PostRequest, res: Response) => {};
}
