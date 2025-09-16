import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PostServices.createPost(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Post created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const PostController = {
    createUser
}