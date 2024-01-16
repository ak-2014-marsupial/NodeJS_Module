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
            const id:string = req.params.id;

            const user = await userService.getById(id);
            return res.status(201).json({data: user})

        } catch (e) {
            next(e);
        }
    }


    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id:string = req.params.id;
            await userService.deleteById(id);
            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
     try{
         const id= req.params.id;
         const body= req.body;
         const user = await userService.updateById(id,body);
         return res.status(201).json(user);
     }catch(e){
         next(e);
     }
    }
}

export const userController = new UserController();