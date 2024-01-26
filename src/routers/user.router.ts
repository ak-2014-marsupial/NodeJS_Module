import { Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {authMiddleware} from "../middlewares/auth.middleware"
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get("/me",commonMiddleware.isBodyValid(UserValidator.update),authMiddleware.checkAccessToken,userController.getMe);
router.put("/me",authMiddleware.checkAccessToken,userController.updateMe);
router.delete("/me",authMiddleware.checkAccessToken,userController.deleteMe);

router.get("/:id", commonMiddleware.isIdValid, userController.getById);

export const userRouter = router;