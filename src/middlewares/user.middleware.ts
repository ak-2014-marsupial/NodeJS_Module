import {Request, Response, NextFunction} from "express";
import {ERole} from "../enums/role.enum";
import {ApiError} from "../errors/api.error";
import {userRepository} from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserMiddleware {
    public haveAccessByRole(...roles: ERole[]) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                const payload = req.res.locals.jwtPayload;
                if (!roles.includes(payload?.role)) {
                    throw new ApiError("Access denied", 403);
                }
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isUserExist(field: keyof IUser) {
        return async (req: Request, res: Response, next: NextFunction)=>
        {
            try {
                const userFromDb = await userRepository.getOneByParams({
                    [field]: req.body[field],
                })
                if (!userFromDb) {
                    throw new ApiError("User not found", 404);
                }
                req.res.locals = userFromDb;
                next();
            } catch (e) {
                next(e);
            }
        }
    }

}

export const userMiddleware = new UserMiddleware();