import { Router } from 'express';
import {
    registerNewUser,
    logInUser,
    getMe
} from "./user.controller.js";
import {authMiddleware} from "../middleware/authentication.js";

export const router = Router();

router.post('/register', registerNewUser);
router.post('/login',logInUser);
router.get('/me', authMiddleware, getMe);