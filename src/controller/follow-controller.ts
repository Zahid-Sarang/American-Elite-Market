import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/user-types";
import createHttpError from "http-errors";
import { FollowService } from "../service/follow-service";
import { UserService } from "../service/user-service";

export class FollowController {
    constructor(
        private followService: FollowService,
        private userSerivce: UserService,
    ) {}

    followUser = async (req: Request, res: Response, next: NextFunction) => {
        const userIdToFollow = req.params.userId;
        const loggedInUserId = (req as AuthRequest).auth.sub;

        if (!userIdToFollow) {
            return next(createHttpError(400, "Invalid following Id!"));
        }
        const startFollowing = await this.followService.follow(
            loggedInUserId,
            userIdToFollow,
        );
        res.json(startFollowing);
    };

    getFollowing = async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as AuthRequest).auth.sub;
        const user = await this.userSerivce.findById(userId);
        if (!user) {
            return next(createHttpError(400, "User not found!"));
        }
        const following = await this.followService.getFollowings(userId);
        res.json(following);
    };
}
