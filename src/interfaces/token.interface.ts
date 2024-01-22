import {Types} from "mongoose";

export interface ITokensPair {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    userId: Types.ObjectId;
}

export interface IToken extends ITokensPair {
    _userId: Types.ObjectId;
}