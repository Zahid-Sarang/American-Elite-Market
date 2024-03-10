import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import createHttpError from "http-errors";

export class UserController {
    constructor(private userService: UserService) {}

    updateUser = (req: Request, res: Response) => {
        res.json("user Updated");
    };
    getAllUsers = async (req: Request, res: Response) => {
        const allUsers = await this.userService.getUsers();
        res.json(allUsers);
    };
    getOneUser = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        if (!userId) {
            next(createHttpError(400, "Invalid userId!"));
        }
        const user = await this.userService.findById(userId);
        if (!user) {
            next(createHttpError(400, "User does not exist!"));
            return;
        }
        res.json(user);
    };
}
