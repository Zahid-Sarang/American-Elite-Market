import FollowModal from "../models/follow-modal";

export class FollowService {
    constructor() {}

    follow = async (loggedInUserId: string, userIdToFollow: string) => {
        return await FollowModal.create({
            followerId: loggedInUserId,
            followingId: userIdToFollow,
        });
    };

    getFollowings = async (userId: string) => {
        return await FollowModal.find({ followerId: userId })

            .populate("followingId", "-password -__V")
            .exec();
    };
}
