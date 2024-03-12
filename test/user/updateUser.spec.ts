import createJWKSMock from "mock-jwks";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import path from "path";
import fs from "fs";
import UserModel from "../../src/models/user-model";

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

describe("PATCH /user/update", () => {
    it("should update a user and return new user data", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            bio: "rider-provider",
            profileImage: profilePhoto,
        };

        const updateUserData = {
            bio: "jackel-the rider",
            userName: "jackel",
        };

        const createdUser = await UserModel.create(userData);

        const accessToken = jwks.token({
            sub: createdUser._id,
        });

        const response = await request(app)
            .patch("/users")
            .set("Cookie", [`accessToken=${accessToken}`])
            .send(updateUserData);

        expect(response.statusCode).toBe(200);
        expect(response.body.userName).toBe(updateUserData.userName);
        expect(response.body.bio).toBe(updateUserData.bio);
        expect(response.body._id).toBe(createdUser._id);
    });
});
