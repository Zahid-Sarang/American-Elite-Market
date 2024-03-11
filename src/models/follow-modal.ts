import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { UserInfo } from "../types/user-types";
interface FollowSchema {
    _id: string;
    followerId: UserInfo;
    followingId: UserInfo;
}

const followSchema = new mongoose.Schema<FollowSchema>({
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    followerId: {
        type: mongoose.Schema.Types.Mixed,
        ref: "User",
    },
    followingId: {
        type: mongoose.Schema.Types.Mixed,
        ref: "User",
    },
});

const FollowModal = mongoose.model<FollowSchema>("Follow", followSchema);

export default FollowModal;
