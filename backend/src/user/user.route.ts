import { Router } from 'express';
import {
    registerNewUser,
    logInUser
} from "./user.controller.js";

export const router = Router();

router.post('/register', registerNewUser);
router.post('/login',logInUser);