import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";
import { UserInfo } from "../types/user-types";
import refreshTokenModel from "../models/refreshToken-model";
import createHttpError from "http-errors";

export class JwtTokenService {
    constructor() {}

    generateAccessToken = (payload: JwtPayload) => {
        const privateKey = Config.PRIVATE_KEY;
        if (!Config.PRIVATE_KEY) {
            const error = createHttpError(500, "SECRET_KEY is not set");
            throw error;
        }
        const accessToken = sign(payload, privateKey!, {
            algorithm: "RS256",
            expiresIn: "1h",
        });
        return accessToken;
    };

    generateRefreshToken = (payload: JwtPayload) => {
        const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
            algorithm: "HS256",
            expiresIn: "1y",
            jwtid: String(payload.id),
        });
        return refreshToken;
    };
    persistRefreshToken = async (user: UserInfo) => {
        const MS_IN_YEAR = 1000 * 60 * 24 * 365;
        const refreshToken = await refreshTokenModel.create({
            user: user,
            expiresAt: new Date(Date.now() + MS_IN_YEAR),
        });
        return refreshToken;
    };
    deleteRefreshToken = async (tokenId: string) => {
        return await refreshTokenModel.findByIdAndDelete(tokenId);
    };
}
