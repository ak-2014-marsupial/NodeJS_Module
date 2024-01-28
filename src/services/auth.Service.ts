import {Types} from "mongoose";

import {ApiError} from "../errors/api.error";
import {ILogin} from "../interfaces/auth.interface";
import {ITokenPayload, ITokensPair} from "../interfaces/token.interface";
import {IUser} from "../interfaces/user.interface";
import {tokenRepository} from "../repositories/token.repository";
import {userRepository} from "../repositories/user.repository";
import {passwordService} from "./password.Service";
import {tokenService} from "./token.service";
import {ERole} from "../enums/role.enum";

class AuthService {
    public async signUpAdmin(dto: Partial<IUser>): Promise<IUser> {
        const userFromDb = await userRepository.getOneByParams({email: dto.email});
        if (!userFromDb) {
            throw new ApiError("User with provided email already exist", 400);
        }
        const hashedPassword = await passwordService.hash(dto.password);
        return await userRepository.create({...dto, password: hashedPassword, role: ERole.ADMIN});
    }

    public async signInAdmin(dto: ILogin): Promise<ITokensPair> {
        const userFromDb: IUser = await userRepository.getOneByParams({email: dto.email, role: ERole.ADMIN});
        if (!userFromDb) {
            throw new ApiError("Not valid email or password", 401);
        }
        const isMatch: boolean = await passwordService.compare(dto.password, userFromDb.password);
        if (!isMatch) {
            throw new ApiError("Not valid email or password", 401);
        }

        const jwtTokens = tokenService.generateTokenPair({userId: userFromDb._id, role: ERole.ADMIN}, ERole.ADMIN);
        await tokenRepository.create({...jwtTokens, _userId: userFromDb._id})

        return jwtTokens;
    }

    public async signUp(dto: Partial<IUser>): Promise<IUser> {
        const hashedPassword = await passwordService.hash(dto.password);
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
        const jwtTokens: ITokensPair = tokenService.generateTokenPair({userId: user._id, role: ERole.USER}, ERole.USER);
        await tokenRepository.create({...jwtTokens, _userId: user._id});
        return jwtTokens;
    }

    public async refresh(jwtPayload: ITokenPayload, refreshToken: string): Promise<ITokensPair> {
        const userFromDb = await userRepository.getById(jwtPayload.userId);
        await tokenRepository.deleteOneByParams({refreshToken});

        const jwtTokens = tokenService.generateTokenPair({
            userId: jwtPayload.userId, role: userFromDb.role
        }, userFromDb.role)
        await tokenRepository.create({
            ...jwtTokens, _userId: new Types.ObjectId(jwtPayload.userId)
        })
        return jwtTokens;
    }
}

export const authService = new AuthService();