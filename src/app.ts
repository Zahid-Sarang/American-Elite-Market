import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-route";
import userRoute from "./routes/user-route";
import postRoute from "./routes/post-route";
import followRoute from "./routes/follow-route";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});
app.use("/auth", authRouter);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/relationship", followRoute);
app.use(globalErrorHandler);

export default app;
