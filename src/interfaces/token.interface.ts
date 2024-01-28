import {Types} from "mongoose";
import { ERole } from "../enums/role.enum";

export interface ITokensPair {
    accessToken: string;
    accessExpiresIn: string;
    refreshToken: string;
    refreshExpiresIn: string;
}

export interface ITokenPayload {
    userId: string;
    role:ERole;
}

export interface IToken extends ITokensPair {
    _userId: Types.ObjectId;
}