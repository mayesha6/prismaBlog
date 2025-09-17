import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.services";

const loginWithEmailAndPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthServices.loginWithEmailAndPassword(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Logged In successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: err instanceof Error ? err.message : err,
    });
  }
};
const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthServices.loginWithGoogle(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Logged In successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const AuthController = {
    loginWithEmailAndPassword,
    loginWithGoogle
}