
import PostModel from "../models/post-model";
import { Post } from "../types/post-types";
import { UserInfo } from "../types/user-types";

export class PostService {
    constructor() {}

    // Create a new post
    create = async (user: UserInfo, post: Post) => {
        const newPost = await PostModel.create({
            content: post.content,
            user: user._id,
        });
        return newPost;
    };

    // Update a post by its ID
    updateById = async (postId: string, post: Post) => {
        const { content } = post;
        return await PostModel.findByIdAndUpdate(
            postId,
            { content: content },
            { new: true },
        );
    };

    // Find a post by its ID and populate the user field
    findPostById = async (postId: string) => {
        return await PostModel.findById(postId).populate("user").exec();
    };

    // Get all posts and populate the user field
    getPosts = async () => {
        return await PostModel.find().populate("user");
    };

    // Delete a post by its ID
    deleteById = async (postId: string) => {
        return await PostModel.findByIdAndDelete(postId);
    };

    
}
