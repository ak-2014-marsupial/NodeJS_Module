import {Schema, Types, model} from "mongoose";

import {User} from "../models/user.model";

const actionTokenSchema = new Schema(
    {
        actionToken: {
            type: String,
            required: true,
        },
        tokenType: {
            type: String,
            required: true,
        },

        _userId: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)


export const ActionToken = model("actionToken", actionTokenSchema);