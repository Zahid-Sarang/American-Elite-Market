import path from "path";
import fs from "fs";
import { JwtPayload, sign } from "jsonwebtoken";

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
}
