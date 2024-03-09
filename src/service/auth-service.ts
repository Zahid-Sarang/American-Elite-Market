import createHttpError from "http-errors";
import UserModel from "../models/user-model";
import { UserInfo } from "../types/user-types";

export class AuthService {
    constructor() {}

    createUser = async (userInfo: UserInfo) => {
        const { email, userName } = userInfo;

        const isUserExist = await UserModel.findOne({
            $or: [{ email }, { userName }],
        }).select("_id");

        if (isUserExist) {
            throw createHttpError(400, "User already exists");
        }

        const user = await UserModel.create(userInfo);
        return user;
    };
}
