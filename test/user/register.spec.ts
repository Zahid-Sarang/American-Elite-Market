import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import path from "path";
import fs from "fs";
import UserModel from "../../src/models/user-model";
import refreshTokenModel from "../../src/models/refreshToken-model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // You may add additional setup steps here if needed
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe("POST /posts", () => {
    it("should register a new user", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
        };

        const response = await request(app)
            .post("/auth/register")
            .field("userName", userData.userName)
            .field("email", userData.email)
            .field("password", userData.password)
            .attach("profileImage", profilePhoto, "testing.jpeg");

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();

        // Check if user is correctly registered
        const registeredUser = await UserModel.findOne({
            email: userData.email,
        });
        expect(registeredUser!._id).toEqual(response.body.id);
        expect(registeredUser).toBeDefined();
        expect(registeredUser!.userName).toBe(userData.userName);
        expect(registeredUser!.email).toBe(userData.email);
        expect(registeredUser!.password).not.toBe(userData.password);
        expect(registeredUser!.password).toMatch(/^\$2[a|b]\$\d+\$/);
    });

    it("should return an array of error message if any fileds is missing", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "",
            password: "password",
        };

        const response = await request(app)
            .post("/auth/register")
            .field("userName", userData.userName)
            .field("email", userData.email)
            .field("password", userData.password)
            .attach("profileImage", profilePhoto, "testing.jpeg");

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(
            (response.body as Record<string, string>).errors.length,
        ).toBeGreaterThan(0);
    });

    it("should store the refresh token in the database", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "zahid@gmail.com",
            password: "password",
        };

        await request(app)
            .post("/auth/register")
            .field("userName", userData.userName)
            .field("email", userData.email)
            .field("password", userData.password)
            .attach("profileImage", profilePhoto, "testing.jpeg");
        const registeredUser = await UserModel.findOne({
            email: userData.email,
        });
        const userId = registeredUser!._id;
        const refreshToken = await refreshTokenModel.findOne({
            user: userId,
        });
        expect(refreshToken!.user).toBe(userId);
    });
});
