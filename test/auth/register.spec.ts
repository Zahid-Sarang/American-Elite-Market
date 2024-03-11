import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import path from "path";
import fs from "fs";
import UserModel from "../../src/models/user-model";

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

describe("POST /auth/register", () => {
    it("should register a new user", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            // profileImage: profilePhoto, // Replace with the correct path
        };

        const response = await request(app)
            .post("/auth/register")
            .field("userName", userData.userName)
            .field("email", userData.email)
            .field("password", userData.password)
            .attach("profileImage", profilePhoto, "testing.jpeg");
        console.log(response.body);

        expect(response.statusCode).toBe(201);

        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();

        // Check if user is correctly registered
        const registeredUser = await UserModel.findOne({
            email: userData.email,
        });
        console.log(registeredUser);
        expect(registeredUser!._id).toEqual(response.body.id);
        expect(registeredUser).toBeDefined();
        expect(registeredUser!.userName).toBe(userData.userName);
        expect(registeredUser!.email).toBe(userData.email);
    });
});
