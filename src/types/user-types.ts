import { Request } from "express";

export interface UserInfo {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
}

export interface CreateUserRequest extends Request {
    body: UserInfo;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginRequest extends Request {
    body: Login;
}

export interface AuthRequest extends Request {
    auth: {
        sub: string;
        email: string;
        id?: string;
    };
}

export interface UpdateUser {
    userName?: string;
    bio?: string;
    profileImage?: string | null;
}

export interface UpdateUserRequest extends Request {
    body: UpdateUser;
}
