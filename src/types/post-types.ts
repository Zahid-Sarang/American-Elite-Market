import { Request } from "express";

export interface Post {
    content: string;
}

export interface PostRequest extends Request {
    body: Post;
}
