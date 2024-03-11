import express from "express";
import { FollowController } from "../controller/follow-controller";
import { FollowService } from "../service/follow-service";
import authMiddlware from "../common/middlewares/authMiddlware";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { UserService } from "../service/user-service";
import followValidator from "../validator/follow-validator";

const followRoute = express.Router();
const followService = new FollowService();
const userSerivce = new UserService();
const followController = new FollowController(followService, userSerivce);

followRoute.post(
    "/follow/:userId",
    followValidator,
    authMiddlware,
    asyncWrapper(followController.followUser),
);

followRoute.post(
    "/unfollow/:userId",
    followValidator,
    authMiddlware,
    asyncWrapper(followController.unFollowUser),
);

followRoute.get(
    "/following/:userId",
    authMiddlware,
    asyncWrapper(followController.getFollowing),
);

export default followRoute;
