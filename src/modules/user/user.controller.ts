import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.createUser(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUser();
    res.status(200).json({
      success: true,
      data: result,
      message: "User retrieve successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await UserServices.getUserById(id);
    res.status(200).json({
      success: true,
      data: result,
      message: "User retrieve successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await UserServices.updateUserById(id, {
      name: req.body.name,
      phone: req.body.phone,
      picture: req.body.picture,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      success: true,
      data: result,
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await UserServices.deleteUserById(id);
    res.status(200).json({
      success: true,
      data: result,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
