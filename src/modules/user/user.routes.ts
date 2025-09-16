import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.post("/", UserController.createUser)
router.patch("/:id", UserController.updateUserById)
router.delete("/:id", UserController.deleteUserById)

export const userRouter = router

