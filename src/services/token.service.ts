import * as jwt from "jsonwebtoken";

import {configs} from "../configs/config";
import {ITokenPayload, ITokensPair} from "../interfaces/token.interface";

class TokenService {
    public generateTokenPair(payload: ITokenPayload): ITokensPair {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET,
            {expiresIn: configs.JWT_ACCESS_EXPIRES_IN});

        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET,
            {expiresIn: configs.JWT_REFRESH_EXPIRES_IN}
        );

        return {accessToken, refreshToken,} as ITokensPair;
    }
}

export const tokenService = new TokenService();