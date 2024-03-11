/* eslint-disable @typescript-eslint/no-unsafe-return */
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

    getFollowUsers = async (userId: string) => {
        const followingInfo = await FollowModal.aggregate([
            // Match documents where the given user is either the follower or the following user
            {
                $match: {
                    $or: [{ followerId: userId }, { followingId: userId }],
                },
            },

            // Group documents by user ID and push user IDs into arrays
            {
                $group: {
                    _id: null,
                    following: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$followerId", userId] },
                                "$followingId",
                                null,
                            ],
                        },
                    },
                    followers: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$followingId", userId] },
                                "$followerId",
                                null,
                            ],
                        },
                    },
                },
            },

            // Lookup user details based on user IDs
            {
                $lookup: {
                    from: "users",
                    localField: "following",
                    foreignField: "_id",
                    as: "followingUsers",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "followers",
                    foreignField: "_id",
                    as: "followerUsers",
                },
            },

            // Project to remove unnecessary fields and include user details
            {
                $project: {
                    _id: 0,
                    following: "$followingUsers",
                    followers: "$followerUsers",
                },
            },
        ]);
        return followingInfo.length > 0 ? followingInfo[0] : { following: [], followers: [] };
    };
}
