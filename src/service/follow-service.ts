import FollowModal from "../models/follow-modal";

export class FollowService {
    constructor() {}

    follow = async (loggedInUserId: string, userIdToFollow: string) => {
        return await FollowModal.create({
            followerId: loggedInUserId,
            followingId: userIdToFollow,
        });
    };

    isAlreadyFollowed = async (userId: string, userIdToFollow: string) => {
        return await FollowModal.findOne({
            followerId: userId,
            followingId: userIdToFollow,
        });
    };

    unFollow = async (loggedInUserId: string, userIdToUnFollow: string) => {
        await FollowModal.findOneAndDelete({
            followerId: loggedInUserId,
            followingId: userIdToUnFollow,
        });
        return;
    };

    getFollowings = async (userId: string) => {
        return await FollowModal.find({ followerId: userId })
            .populate("followingId", "-password -__V")
            .exec();
    };

    getFollowers = async (userId: string) => {
        return await FollowModal.find({ followingId: userId })
            .populate("followerId", "-password -__V")
            .exec();
    };
}
