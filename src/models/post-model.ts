import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface PostSchema extends Document {
    content: string;
    timestamp: Date;
    user: Schema.Types.ObjectId | string;
}

const postSchema = new mongoose.Schema<PostSchema>({
    _id: {
        type: String,
        default: uuidv4,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const PostModal = mongoose.model("Post", postSchema);
export default PostModal;
