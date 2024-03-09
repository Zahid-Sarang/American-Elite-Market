import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { UserInfo } from "../types/user-types";

const userSchema = new mongoose.Schema<UserInfo>(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String, // Bio field is optional
        },
        profile: {
            type: String, // Profile field is optional
        },
    },
    { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
