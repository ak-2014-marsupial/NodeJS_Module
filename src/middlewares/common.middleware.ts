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

}

export const commonMiddleware = new CommonMiddleware();