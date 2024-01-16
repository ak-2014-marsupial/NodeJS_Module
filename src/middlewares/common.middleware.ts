import {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {isObjectIdOrHexString} from "mongoose";

class CommonMiddleware {
    public isIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!isObjectIdOrHexString(id)) {
                throw new ApiError("wrong ID param",404);
            }
            next();
        } catch (e) {
            next(e)
        }
    }

    // public isValidBody(req: Request, res: Response, next: NextFunction) {
    //     const {email, name, age} = req.body;
    //     try {
    //         if (!age || Number.isInteger(age) || age <= 0 || age > 100) {
    //             throw new ApiError("wrong age",404);
    //         }
    //         if (!name || name.length <= 3) {
    //             throw new ApiError("wrong name",404);
    //         }
    //         if (!email || !email.includes("@")) {
    //             throw new ApiError("wrong email",404);
    //         }
    //         next();
    //     } catch (e) {
    //         next(e)
    //     }
    // }

}

export const commonMiddleware = new CommonMiddleware();