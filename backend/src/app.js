import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);
// example route: http://localhost:4000/api/v1/users/register
export default app;
