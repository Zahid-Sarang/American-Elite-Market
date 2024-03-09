import UserModel from "../models/user-model";
import { UserInfo } from "../types/user-types";

export class AuthService {
    constructor() {}

    createUser = async (userInfo: UserInfo) => {
        const user = await UserModel.create(userInfo);
        return user;
    };
}
