import express, {NextFunction, Request, Response} from "express";

import {configs} from "./configs/config";
import {ApiError} from "./errors/api.error";
import {userRouter} from "./routers/user.router";
import {authRouter} from "./routers/auth.router";
import {adminRouter} from "./routers/admin.router";
import mongoose from "mongoose";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRouter)
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err?.status || 500).json({
            message: err?.message,
            status: err?.status,
        });
    },
);

const PORT = configs.PORT;

app.listen(PORT, async () => {
    try {
        const dbConnection = await mongoose.connect(configs.DB_URL);
        console.log(`MongoDB connected:${dbConnection.connection.host}:${dbConnection.connection.port}/${dbConnection.connection.name}`);
        console.log(`Server has started on PORT ${PORT}`);
    } catch (error) {
        console.log(error.message)
    }


});


