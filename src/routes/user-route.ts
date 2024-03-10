import express from "express";
import authMiddlware from "../common/middlewares/authMiddlware";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { UserController } from "../controller/user-controller";
import { UserService } from "../service/user-service";

const userRoute = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoute.get("/", authMiddlware, asyncWrapper(userController.getAllUsers));
userRoute.get(
    "/:userId",
    authMiddlware,
    asyncWrapper(userController.getOneUser),
);

export default userRoute;
