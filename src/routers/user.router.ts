import { Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("", userController.getAll);
router.get("/:id", commonMiddleware.isIdValid, userController.getById);
router.delete("/:id",commonMiddleware.isIdValid,userController.deleteById);
router.put("/:id",commonMiddleware.isIdValid,userController.updateById);

export const userRouter = router;