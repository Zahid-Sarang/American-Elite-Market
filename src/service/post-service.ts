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

    updateById = async (postId: string, post: Post) => {
        const { content } = post;
        return await PostModal.findByIdAndUpdate(
            { _id: postId },
            { content: content },
            { new: true },
        );
    };

    findPostById = async (postId: string) => {
        return await PostModal.findById(postId);
    };

    getPosts = async () => {
        return await PostModal.find();
    };
}
