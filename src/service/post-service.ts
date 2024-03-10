import PostModal from "../models/post-model";
import { Post } from "../types/post-types";
import { UserInfo } from "../types/user-types";

export class PostService {
    constructor() {}

    create = async (user: UserInfo, post: Post) => {
        const newpost = await PostModal.create({
            content: post.content,
            user: user,
        });

        return newpost;
    };
}
