import {Request, Response, NextFunction} from "express";

class AdminController {
    public async getAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const admin = [];
            return res.json({data: admin});
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();