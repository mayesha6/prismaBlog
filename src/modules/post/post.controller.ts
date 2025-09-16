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
       const page = Number(req.query.page) || 1
    const limit =  Number(req.query.limit) || 10
    const result = await PostServices.getAllPost({page, limit});
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
    const id = Number(req.params.id);
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
const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await PostServices.updatePostById(id, {
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.body.thumbnail,
      tags: req.body.tags,
    });
    res.status(200).json({
      success: true,
      data: result,
      message: "Post updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await PostServices.deletePostById(id);
    res.status(200).json({
      success: true,
      data: result,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById
};
