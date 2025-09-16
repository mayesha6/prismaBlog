import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.services";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
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
const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PostServices.getAllPost();
    res.status(200).json({
      success: true,
      data: result,
      message: "Post retrieve successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve post",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const result = await PostServices.getPostById(id);
    res.status(200).json({
      success: true,
      data: result,
      message: "Post retrieve successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const PostController = {
    createPost,
    getAllPost,
    getPostById
}