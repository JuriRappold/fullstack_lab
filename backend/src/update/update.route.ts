import {Router} from "express";
import {
    newUpdate,
    readUpdateById,
    readUpdatesOfProject, readUpdatesOfUser
} from './update.controller.js';
import { checkID } from "../middleware/isUUID.js";
import { authMiddleware } from '../middleware/authentication.js'

export const router = Router();

router.use(authMiddleware);
/*
POST `/api/update/:projectId`
 */
router.post('/create', checkID, newUpdate);
/*
GET `/api/update/project/:projectId`
GET `/api/update/update/:updateId`
GET `/api/update/user/
--> contribution/owner check
 */
router.get('/project/:projectId', checkID, readUpdatesOfProject);

router.get('/update/:updateId', checkID, readUpdateById);

router.get('/user/', readUpdatesOfUser);
