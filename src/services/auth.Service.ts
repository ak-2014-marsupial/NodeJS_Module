import {Types} from "mongoose";

import {ApiError} from "../errors/api.error";
import {ILogin} from "../interfaces/auth.interface";
import {ITokenPayload, ITokensPair} from "../interfaces/token.interface";
import {IUser} from "../interfaces/user.interface";
import {tokenRepository} from "../repositories/token.repository";
import {userRepository} from "../repositories/user.repository";
import {passwordService} from "./password.Service";
import {tokenService} from "./token.service";
import {emailService} from "./email.service";
import { EEmailAction } from "../enums/email-action.enum";

class AuthService {
    public async signUp(dto: Partial<IUser>): Promise<IUser> {
        const userFromDb = await userRepository.getOneByParams({
            email: dto.email,
        });
        if (userFromDb) {
            throw new ApiError("User with provided email already exists", 400);
        }
        const hashedPassword = await passwordService.hash(dto.password);

        // ======
        await emailService.sendMail("", EEmailAction.WELCOME);
        // =========
        return userRepository.create({...dto, password: hashedPassword});
    }

    public async signIn(dto: ILogin): Promise<ITokensPair> {
        const user = await userRepository.getOneByParams({email: dto.email});
        if (!user) {
            throw new ApiError("Not valid email or password", 401);
        }
        const isMatch = await passwordService.compare(dto.password, user.password);

        if (!isMatch) {
            throw new ApiError("Not valid email or password", 401);
        }
        const jwtTokens: ITokensPair = tokenService.generateTokenPair({userId: user._id});
        await tokenRepository.create({...jwtTokens, _userId: user._id});
        return jwtTokens;
    }

    public async refresh(jwtPayload: ITokenPayload, refreshToken: string): Promise<ITokensPair> {
        await tokenRepository.deleteOneByParams({refreshToken});
        const jwtTokens = tokenService.generateTokenPair({
            userId: jwtPayload.userId
        })
        await tokenRepository.create({
            ...jwtTokens, _userId: new Types.ObjectId(jwtPayload.userId)
        })
        return jwtTokens;
    }
}

export const authService = new AuthService();