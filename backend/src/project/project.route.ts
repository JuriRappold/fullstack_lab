/*
PURPOSE:
- directs to the controller
- call correct middleware
BASE URL: /api/projects
 */

import { Router } from 'express';
import {
    getProjectById,
    getProjectsOf,
    createNewProject,
    deleteProjectById, updateProjectById
} from './project.controller.js'
import {authMiddleware} from "../middleware/authentication.js";

export const router = Router();

/*
Middleware for CRUPD Ops:
- logged in
- owner of the project
 */
router.use(authMiddleware)

/*
**CREATE**
- POST `/api/projects/create`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
 */
router.post('/create', createNewProject)


/*
**READ**
- GET `/api/projects/:id`
	- --> specific project
- GET `/api/projects` or `/api/projects/:userId`
	- for the first one: use Gunnars method of a logged in User
	- otherwise use the second method
- returns 200
- returns 400 if invalid id
 */
router.get('/:id', getProjectById);
router.get('/:userId', getProjectsOf);

/*
**UPDATE**
- PATCH `/api/projects/:id`
	- requires request body
	- returns 200
	- returns 400 if no/insufficient req. body
	- returns 400 if invalid id
 */
router.patch('/:id', updateProjectById)
/*
**DELETE**
- DELETE `/api/projects/:id`
	- returns 204/200
	- returns 400 if invalid id
	- returns 404 if id couldn't be found --> already deleted/never existed
 */
router.delete('/:id', deleteProjectById);