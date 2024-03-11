import { Request } from "express";
import { UserInfo } from "./user-types";

export interface Follow {
    loggedInUserId: string;
}

export interface FollowRequest extends Request {
    body: Follow;
}

export interface FollowInfo {
    following: UserInfo[];
    followers: UserInfo[];
}
