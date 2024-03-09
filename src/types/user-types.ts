import { Request } from "express";

export interface UserInfo {
    _id: string;
    userName: string;
    email: string;
    password: string;
    bio?: string;
    profile?: string;
}

export interface CreateUserRequest extends Request {
    body: UserInfo;
}
