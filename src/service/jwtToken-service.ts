import path from "path";
import fs from "fs";
import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";
import { UserInfo } from "../types/user-types";
import refreshTokenModel from "../models/refreshToken-model";

export class JwtTokenService {
    constructor() {}

    generateAccessToken = (payload: JwtPayload) => {
        const privateKey = fs.readFileSync(
            path.join(__dirname, "../../certs/private.pem"),
        );

        const accessToken = sign(payload, privateKey, {
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
}
