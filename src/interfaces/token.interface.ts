import {Types} from "mongoose";

export interface ITokensPair {
    accessToken: string;
    accessExpiresIn: string;
    refreshToken: string;
    refreshExpiresIn: string;
}

export interface ITokenPayload {
    userId: string;
}

export interface IToken extends ITokensPair {
    _userId: Types.ObjectId;
}