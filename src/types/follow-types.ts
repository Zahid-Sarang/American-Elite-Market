import { Request } from "express";

export interface Follow {
    loggedInUserId: string;
}

export interface FollowRequest extends Request {
    body: Follow;
}
