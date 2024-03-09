import express from "express";
import createUserValidator from "../validator/createUser-validator";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { AuthController } from "../controller/auth-controller";
import { AuthService } from "../service/auth-service";
import { HashedPasswordService } from "../service/hashedPassword-Service";
import { upload } from "../common/middlewares/multerFileHanndler";
import { CloudinaryStorage } from "../service/cloudinaryStorage";
import { JwtTokenService } from "../service/jwtToken-service";
import loginUserValidator from "../validator/loginUser-Validator";

const authRouter = express.Router();
const authService = new AuthService();
const hashedPasswordService = new HashedPasswordService();
const storageService = new CloudinaryStorage();
const jwtTokenService = new JwtTokenService();
const authController = new AuthController(
    authService,
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
export default authRouter;
