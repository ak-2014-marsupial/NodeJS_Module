import {Types} from "mongoose";
import { ERole } from "../enums/role.enum";
import {EActionTokenType} from "../enums/EToken-type.enum";

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

export interface IActionToken{
    actionToken:string;
    tokenType:EActionTokenType;
    _userId:Types.ObjectId;
}