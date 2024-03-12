import createJWKSMock from "mock-jwks";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import path from "path";
import fs from "fs";
import UserModel from "../../src/models/user-model";
import PostModel from "../../src/models/post-model";

let mongoServer: MongoMemoryServer;
let jwks: ReturnType<typeof createJWKSMock>;

beforeAll(async () => {
    jwks = createJWKSMock("http://localhost:5502");
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    jwks.start();
});

afterEach(async () => {
    jwks.stop();
    await mongoose.connection.dropDatabase();
});

describe("POST /posts", () => {
    it("should create a post ", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            bio: "rider-provider",
            profileImage: profilePhoto,
        };

        const createdUser = await UserModel.create(userData);

        const accessToken = jwks.token({
            sub: createdUser._id,
        });

        const postData = {
            content: "this is for testing purposes",
        };

        const response = await request(app)
            .post("/posts")
            .set("Cookie", [`accessToken=${accessToken}`])
            .send(postData);
        console.log(response.body);

        const createdPost = await PostModel.findById(response.body.id);

        expect(response.statusCode).toBe(201);
        expect(postData.content).toBe(createdPost?.content);
    });
});
