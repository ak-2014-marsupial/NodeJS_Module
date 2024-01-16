import {NextFunction, Request, Response} from "express";

import {userService} from "../services/user.service";
import {IUser} from "../interfaces/user.interface";

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
            const id = Number(req.params.id);

            const user = await userService.getById(id);
            return res.status(201).json({data: user})

        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const user = await userService.create(req.body);
            return res.status(201).json({data: user})
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id)
        try {
            await userService.delete(id);
            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
     try{
         const user = await userService.update(Number(req.params.id),req.body);
         return res.status(201).json(user);
     }catch(e){
         next(e);
     }
    }
}

export const userController = new UserController();