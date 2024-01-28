import * as jwt from "jsonwebtoken";

import {configs} from "../configs/config";
import {ITokenPayload, ITokensPair} from "../interfaces/token.interface";
import {ApiError} from "../errors/api.error";
import {ERole} from "../enums/role.enum";
import {ETokenType} from "../enums/EToken-type.enum";

class TokenService {
    public generateTokenPair(payload: ITokenPayload, role: ERole): ITokensPair {
        let accessTokenSecret: string;
        let accessExpiresIn: string;
        let refreshTokenSecret: string;
        let refrechExpiresIn: string;

        switch (role) {
            case ERole.USER:
                accessTokenSecret = configs.JWT_ACCESS_SECRET;
                accessExpiresIn = configs.JWT_ACCESS_EXPIRES_IN;
                refreshTokenSecret = configs.JWT_REFRESH_SECRET;
                refrechExpiresIn = configs.JWT_REFRESH_EXPIRES_IN;
                break;
            case ERole.ADMIN:
                accessTokenSecret = configs.JWT_ADMIN_ACCESS_SECRET;
                accessExpiresIn = configs.JWT_ADMIN_ACCESS_EXPIRES_IN;
                refreshTokenSecret = configs.JWT_ADMIN_REFRESH_SECRET;
                refrechExpiresIn = configs.JWT_ADMIN_REFRESH_EXPIRES_IN;
        }

        const accessToken = jwt.sign(payload, accessTokenSecret,
            {expiresIn: accessExpiresIn});

        const refreshToken = jwt.sign(payload, refreshTokenSecret,
            {expiresIn: refrechExpiresIn}
        );

        return {
            accessToken,
            accessExpiresIn: configs.JWT_ACCESS_EXPIRES_IN,
            refreshToken,
            refreshExpiresIn: configs.JWT_REFRESH_EXPIRES_IN,
        };
    }

    public checkToken(token: string, type: ETokenType, role: ERole): ITokenPayload {
        switch (role) {
            case ERole.USER:
                return this.checkTokenUser(token, type);
            case ERole.ADMIN:
                return this.checkTokenAdmin(token, type);
            default:
                throw new ApiError(`parameter ${role} is not processed yet`,500)
        }
    }

    private checkTokenAdmin(token: string, type: ETokenType): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case ETokenType.ACCESS:
                    secret = configs.JWT_ADMIN_ACCESS_SECRET;
                    break;
                case ETokenType.REFRESH:
                    secret = configs.JWT_ADMIN_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(`parameter ${type} is not processed yet`,500)
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401)
        }

    }

    private checkTokenUser(token: string, type: ETokenType): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case ETokenType.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case ETokenType.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401)
        }
    }

}

export const tokenService = new TokenService();