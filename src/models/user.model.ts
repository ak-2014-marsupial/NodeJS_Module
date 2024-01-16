import {model, Schema} from "mongoose";
import {IUser} from "../interfaces/user.interface";


const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            require: true,
        },
        age: {
            type: Number,
            require: true,
            min: 1,
            max: 100,
        },
        password: {
            type: String,
            require: true,
            select: false,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const User = model<IUser>("user", userSchema)