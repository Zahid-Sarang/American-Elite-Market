import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import { FollowService } from "../service/follow-service";
import { UserService } from "../service/user-service";
import { FollowRequest } from "../types/follow-types";
import { validationResult } from "express-validator";

export class FollowController {
    constructor(
        private followService: FollowService,
        private userSerivce: UserService,
    ) {}
    // Follow a user Method
    followUser = async (
        req: FollowRequest,
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
        const userIdToFollow = req.params.userId;
        const loggedInUserId = req.body.loggedInUserId;

        if (!userIdToFollow) {
            return next(createHttpError(400, "Invalid following Id!"));
        }
        const isAlreadyFollowing = await this.followService.isAlreadyFollowed(
            loggedInUserId,
            userIdToFollow,
        );
        if (isAlreadyFollowing) {
            return next(createHttpError(400, "you already follow this user!"));
        }
        const startFollowing = await this.followService.follow(
            loggedInUserId,
            userIdToFollow,
        );
        res.json(startFollowing);
    };

    // UnFollow a user Method
    unFollowUser = async (
        req: FollowRequest,
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
        const userIdToFollow = req.params.userId;
        const loggedInUserId = req.body.loggedInUserId;
        if (!userIdToFollow) {
            return next(createHttpError(400, "Invalid following Id!"));
        }

        await this.followService.unFollow(loggedInUserId, userIdToFollow);
        res.json({ message: "unfollow user successfully" });
    };

    // Get User Following Method
    getFollowing = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        if (!userId) {
            return next(createHttpError(400, "Invalid userID"));
        }
        const user = await this.userSerivce.findById(userId);
        if (!user) {
            return next(createHttpError(400, "User not found!"));
        }
        const following = await this.followService.getFollowings(userId);
        res.json(following);
    };
}
