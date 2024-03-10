import { expressjwt } from "express-jwt";
import { Config } from "../../config";
import { Request } from "express";
import { AuthCookie, IRefreshTokenPayload } from "../../types/token-types";
import refreshTokenModel from "../../models/refreshToken-model";
import logger from "../../config/logger";

export default expressjwt({
    secret: Config.REFRESH_TOKEN_SECRET!,
    algorithms: ["HS256"],
    getToken(req: Request) {
        const { refreshToken } = req.cookies as AuthCookie;
        return refreshToken;
    },
    async isRevoked(request: Request, token) {
        try {
            const refreshToken = refreshTokenModel.findOne(
                { _id: (token?.payload as IRefreshTokenPayload)._id },
                { user: { _id: token?.payload.sub } },
            );
            return refreshToken === null;
        } catch (err) {
            logger.error("Error while getting refresh token", {
                id: (token?.payload as IRefreshTokenPayload)._id,
            });
        }
        return true;
    },
});
