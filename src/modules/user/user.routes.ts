import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.post("/", UserController.createUser)
router.patch("/", UserController.updateUserById)
router.delete("/", UserController.deleteUserById)

export const userRouter = router

