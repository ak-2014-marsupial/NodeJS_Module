import {Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {authMiddleware} from "../middlewares/auth.middleware"
import {UserValidator} from "../validators/user.validator";
import {ERole} from "../enums/role.enum";

const router = Router();

router.get("/", userController.getAll);

router.get(
    "/me",
    authMiddleware.checkAccessToken(ERole.USER),
    userController.getMe,
);
router.put(
    "/me",
    commonMiddleware.isBodyValid(UserValidator.update),
    authMiddleware.checkAccessToken(ERole.USER),
    userController.updateMe,
);
router.delete(
    "/me",
    authMiddleware.checkAccessToken(ERole.USER),
    userController.deleteMe,
);

router.get("/:id", commonMiddleware.isIdValid, userController.getById);

export const userRouter = router;