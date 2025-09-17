import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.get("/stats", PostController.getBlogStats)
router.get("/", PostController.getAllPost)
router.get("/:id", PostController.getPostById)
router.post("/", PostController.createPost)
router.patch("/:id", PostController.updatePostById)
router.delete("/:id", PostController.deletePostById)

export const postRouter = router

