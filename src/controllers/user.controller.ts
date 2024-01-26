import {NextFunction, Request, Response} from "express";

import {userService} from "../services/user.service";
import {IUser} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();

            return res.status(200).json({data: users});
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const id: string = req.params.id;

            const user = await userService.getById(id);
            return res.status(201).json({data: user})

        } catch (e) {
            next(e);
        }
    }


    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const user = await userService.getMe(jwtPayload);

            res.status(200).json({data: user});
        } catch (e) {
            next(e);
        }
    }

    public async updateMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const body = req.body as Partial<IUser>;
            const user = await userService.updateMe(jwtPayload, body);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    }

    public async deleteMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            await userService.deleteMe(jwtPayload);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();