import { Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("", userController.getAll);
router.get("/:id", commonMiddleware.isIdValid, userController.getById);
//
router.post("", commonMiddleware.isValidBody,userController.create);

router.delete("/:id",commonMiddleware.isIdValid,userController.delete);
router.put("/:id",commonMiddleware.isIdValid,commonMiddleware.isValidBody,userController.update);

export const userRouter = router;