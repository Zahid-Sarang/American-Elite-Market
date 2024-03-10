import express from "express";
import authMiddlware from "../common/middlewares/authMiddlware";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { UserController } from "../controller/user-controller";
import { UserService } from "../service/user-service";
import { upload } from "../common/middlewares/multerFileHanndler";
import updateUserValidator from "../validator/updateUser-validator";
import { CloudinaryStorage } from "../service/cloudinaryStorage";
import logger from "../config/logger";

const userRoute = express.Router();
const userService = new UserService();
const storageService = new CloudinaryStorage();

const userController = new UserController(userService, storageService, logger);

userRoute.get("/", authMiddlware, asyncWrapper(userController.getAllUsers));
userRoute.get(
    "/:userId",
    authMiddlware,
    asyncWrapper(userController.getOneUser),
);

userRoute.patch(
    "/",
    upload.single("profileImage"),
    updateUserValidator,
    authMiddlware,
    asyncWrapper(userController.updateUser),
);
export default userRoute;
