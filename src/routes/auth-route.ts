import express from "express";
import createUserValidator from "../validator/createUser-validator";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { AuthController } from "../controller/auth-controller";
import { UserService } from "../service/user-service";
import { HashedPasswordService } from "../service/hashedPassword-Service";
import { upload } from "../common/middlewares/multerFileHanndler";
import { CloudinaryStorage } from "../service/cloudinaryStorage";
import { JwtTokenService } from "../service/jwtToken-service";
import loginUserValidator from "../validator/loginUser-Validator";
import authMiddlware from "../common/middlewares/authMiddlware";
import validateRefreshToken from "../common/middlewares/validateRefreshToken";
import parseRefreshToken from "../common/middlewares/parseRefreshToken";

const authRouter = express.Router();
const userSerivce = new UserService();
const hashedPasswordService = new HashedPasswordService();
const storageService = new CloudinaryStorage();
const jwtTokenService = new JwtTokenService();
const authController = new AuthController(
    userSerivce,
    logger,
    hashedPasswordService,
    storageService,
    jwtTokenService,
);

authRouter.post(
    "/register",
    upload.single("profileImage"),
    createUserValidator,
    asyncWrapper(authController.register),
);

authRouter.post(
    "/login",
    loginUserValidator,
    asyncWrapper(authController.login),
);

authRouter.get("/self", authMiddlware, asyncWrapper(authController.self));
authRouter.post(
    "/refreshToken",
    validateRefreshToken,
    asyncWrapper(authController.refreshTokenGenerate),
);

authRouter.post(
    "/logout",
    parseRefreshToken,
    asyncWrapper(authController.logout),
);

export default authRouter;
