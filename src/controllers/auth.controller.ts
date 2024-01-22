import {Request, Response, NextFunction} from "express";
import {IUser} from "../interfaces/user.interface";
import {authService} from "../services/auth.Service";
import {ILogin} from "../interfaces/auth.interface";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body:Partial<IUser> = req.body as Partial<IUser>;
            const createdUser:IUser = await authService.signUp(body);
            return res.json({data: createdUser})
        } catch (e) {
            next(e)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as ILogin;

            const jwtTokens =await authService.signIn(body);
            return res.json({data:jwtTokens});
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();