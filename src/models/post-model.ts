import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { UserInfo } from "../types/user-types";

// Define an interface for the PostSchema document
interface PostSchema {
    _id: string;
    content: string;
    timestamp: Date;
    user: UserInfo;
}

// Define the schema for the Post
const postSchema = new Schema<PostSchema>({
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user: {
        type: String,
        ref: "User",
    },
});

// Define the Post model
const PostModel = model<PostSchema>("Post", postSchema);

export default PostModel;
