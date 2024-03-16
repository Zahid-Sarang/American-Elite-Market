import { config } from "dotenv";
import path from "path";
config({
    path: path.join(
        __dirname,
        `../../.env.${process.env.NODE_ENV || "development"}`,
    ),
});

const {
    PORT,
    NODE_ENV,
    DATABASE_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
    JWKS_URI,
    PRIVATE_KEY,
} = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DATABASE_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
    JWKS_URI,
    PRIVATE_KEY,
};
