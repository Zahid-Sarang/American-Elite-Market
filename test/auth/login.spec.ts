import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import path from "path";
import bcryptjs from "bcryptjs";
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

describe("POST /auth/login", () => {
    it("should login a new user", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            profileImage: imagePath,
        };
        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        await UserModel.create({ ...userData, password: hashedPassword });

        const loginData = {
            email: "testuser@example.com",
            password: "password",
        };

        const response = await request(app).post("/auth/login").send(loginData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
    });

    it("should return an array of error message if any fileds is missing", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        // const profilePhoto = fs.readFileSync(imagePath);
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            profileImage: imagePath,
        };
        await UserModel.create(userData);

        const loginData = {
            email: "",
            password: "password",
        };

        const response = await request(app).post("/auth/login").send(loginData);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(
            (response.body as Record<string, string>).errors.length,
        ).toBeGreaterThan(0);
    });

    it("should store the refresh token in the database", async () => {
        const imagePath = path.join(__dirname, "../../public/testing.jpeg");
        const userData = {
            userName: "testuser",
            email: "testuser@example.com",
            password: "password",
            profileImage: imagePath,
        };
        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        const registeredUser = await UserModel.create({
            ...userData,
            password: hashedPassword,
        });

        const loginData = {
            email: "testuser@example.com",
            password: "password",
        };

        const response = await request(app).post("/auth/login").send(loginData);

        const userId = registeredUser!._id;
        const refreshToken = await refreshTokenModel.findOne({
            user: userId,
        });
        expect(refreshToken!.user).toBe(userId);
    });
});
