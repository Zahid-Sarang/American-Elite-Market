import express from "express";
import { AuthController } from "../controller/auth-controller";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { AuthService } from "../service/auth-service";
import logger from "../config/logger";
import createUserValidator from "../validator/create-user-validator";

const authRouter = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService, logger);

authRouter.post(
    "/register",
    createUserValidator,
    asyncWrapper(authController.register),
);

export default authRouter;
