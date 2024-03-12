import createHttpError from "http-errors";
import UserModel from "../models/user-model";
import { UpdateUser, UserInfo } from "../types/user-types";

export class UserService {
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

    findByEmail = async (userEmail: string) => {
        return await UserModel.findOne({ email: userEmail });
    };

    findById = async (userId: string) => {
        return await UserModel.findById(userId);
    };

    getUsers = async () => {
        return await UserModel.find().select(["-password", "-__v"]);
    };

    updateById = async (userId: string, user: UpdateUser) => {
        const { userName, bio, profileImage } = user;
        return await UserModel.findByIdAndUpdate(
            { _id: userId },
            { userName, bio, profileImage },
            { new: true },
        );
    };

    deleteById = async (userId: string) => {
        return await UserModel.findByIdAndDelete({ _id: userId });
    };
}
