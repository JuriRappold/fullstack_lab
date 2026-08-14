import {Router} from "express";
import {
    newUpdate,
    readUpdateById,
    readUpdatesOfProject
} from './update.controller.js';
import { checkID } from "../middleware/isUUID.js";
import { authMiddleware } from '../middleware/authentication.js'

export const router = Router();

router.use(authMiddleware);
/*
POST `/api/update/:projectId`
 */
router.post('/:projectId', checkID, newUpdate);
/*
GET `/api/update/:projectId`
GET `/api/update/:updateId`
--> contribution/owner check
 */
router.get('/project/:projectId', checkID, readUpdatesOfProject);

router.get('/update/:updateId', checkID, readUpdateById)
