import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.get("/login", AuthController.loginWithEmailAndPassword)
router.get("/google", AuthController.loginWithGoogle)

export const authRouter = router

