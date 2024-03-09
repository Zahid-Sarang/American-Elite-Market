import express from "express";
import createUserValidator from "../validator/create-user-validator";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { AuthController } from "../controller/auth-controller";
import { AuthService } from "../service/auth-service";
import { HashedPassword } from "../service/hashedPassword-Service";
import { upload } from "../common/middlewares/multerFileHanndler";
import { CloudinaryStorage } from "../service/cloudinaryStorage";

const authRouter = express.Router();
const authService = new AuthService();
const hashedPassword = new HashedPassword();
const storageService = new CloudinaryStorage();
const authController = new AuthController(
    authService,
    logger,
    hashedPassword,
    storageService,
);

authRouter.post(
    "/register",
    upload.single("profileImage"),
    createUserValidator,
    asyncWrapper(authController.register),
);

export default authRouter;
