import { Router } from "express";
import { ERole } from "../enums/role.enum";
import { adminController } from "../controllers/admin.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router=Router();

router.get("/list",
    authMiddleware.checkAccessToken(ERole.ADMIN),
    userMiddleware.haveAccessByRole(ERole.ADMIN),
    adminController.getAdmins,
    )

export const adminRouter = router;