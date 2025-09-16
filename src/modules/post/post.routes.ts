import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.get("/", PostController.getAllUser)
router.post("/", PostController.createUser)

export const postRouter = router

