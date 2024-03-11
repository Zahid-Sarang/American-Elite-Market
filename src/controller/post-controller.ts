import { NextFunction, Request, Response } from "express";
import { PostRequest } from "../types/post-types";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { AuthRequest } from "../types/user-types";
import { PostService } from "../service/post-service";
import { Logger } from "winston";
import { UserService } from "../service/user-service";
import { FollowService } from "../service/follow-service";

export class PostController {
    constructor(
        private postService: PostService,
        private userService: UserService,
        private followService: FollowService,
        private logger: Logger,
    ) {}

    // Create Post Method
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
        res.status(201).json({ id: post._id });
    };

    // Get One Post Method
    getOnePost = async (req: Request, res: Response, next: NextFunction) => {
        const postId = req.params.postId;
        if (!postId) {
            return next(createHttpError(400, "Invalid post ID!"));
        }

        const post = await this.postService.findPostById(postId);

        if (!post) {
            return next(createHttpError(400, "Post Not Found!"));
        }
        res.json(post);
    };

    // Get All Post Method
    getAllPost = async (req: Request, res: Response) => {
        const posts = await this.postService.getPosts();
        res.json(posts);
    };

    // Update Post Method
    updatePost = async (
        req: PostRequest,
        res: Response,
        next: NextFunction,
    ) => {
        const { content } = req.body;

        const userId = (req as AuthRequest).auth.sub;

        const postId = req.params.postId;
        if (!postId) {
            return next(createHttpError(400, "Invalid post ID!"));
        }

        const isPostExist = await this.postService.findPostById(postId);
        if (!isPostExist) {
            return next(createHttpError(400, "Post Not Found"));
        }

        if (isPostExist.user._id !== userId) {
            return next(
                createHttpError(
                    400,
                    "You are not allowed to update this post!",
                ),
            );
        }

        const updatedPost = await this.postService.updateById(postId, {
            content,
        });

        res.json(updatedPost);
    };

    // Delete Post Method
    deletePost = async (req: Request, res: Response, next: NextFunction) => {
        const postId = req.params.postId;
        const userId = (req as AuthRequest).auth.sub;

        if (!postId) {
            return next(createHttpError(400, "Invalid post ID!"));
        }

        const isPostExist = await this.postService.findPostById(postId);
        if (!isPostExist) {
            return next(createHttpError(400, "Post Not Found"));
        }

        if (isPostExist.user._id !== userId) {
            return next(
                createHttpError(
                    400,
                    "You are not allowed to delete this post!",
                ),
            );
        }

        await this.postService.deleteById(postId);
        res.json("post deleted");
    };

    
}
