import {Request, Response, NextFunction} from "express";

import {ApiError} from "../errors/api.error";
import {isObjectIdOrHexString} from "mongoose";
import {ObjectSchema} from "joi";

class CommonMiddleware {
    public isIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!isObjectIdOrHexString(id)) {
                throw new ApiError("wrong ID param", 404);
            }
            next();
        } catch (e) {
            next(e)
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                const {value, error} = validator.validate(req.body);

                if (error) {
                    throw new ApiError(error.details[0].message, 400);
                }
                req.body = value;
                next();
            } catch (e) {
                next(e)
            }
        }
    }

}


export const commonMiddleware = new CommonMiddleware();