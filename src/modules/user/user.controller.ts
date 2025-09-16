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

export const UserController = {
  createUser,
  getAllUser,
};
