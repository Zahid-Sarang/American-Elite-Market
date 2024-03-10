import express from "express";
import { PostController } from "../controller/post-controller";
import { PostService } from "../service/post-service";
import logger from "../config/logger";
import authMiddlware from "../common/middlewares/authMiddlware";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { UserService } from "../service/user-service";

const postRoute = express.Router();
const postService = new PostService();
const userService = new UserService();
const postController = new PostController(postService, userService, logger);

postRoute.post("/", authMiddlware, asyncWrapper(postController.createPost));

postRoute.get(
    "/:postId",
    authMiddlware,
    asyncWrapper(postController.getOnePost),
);
postRoute.get("/", authMiddlware, asyncWrapper(postController.getAllPost));

postRoute.patch(
    "/:postId",
    authMiddlware,
    asyncWrapper(postController.updatePost),
);

postRoute.delete(
    "/:postId",
    authMiddlware,
    asyncWrapper(postController.deletePost),
);
export default postRoute;
