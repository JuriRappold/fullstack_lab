import{Router, type Request, type Response, type NextFunction } from 'express';
import {router as projectRouter} from './project/project.route.js'
import { router as userRouter} from './user/user.route.js';
import { router as updateRouter } from './update/update.route.js';
import {ApiError} from "@fullstack-lab/utils";



export const router = Router()

export const printRequest = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.originalUrl);
    // console.log(req.baseUrl);
    // console.log(req.method)
    next();
    return;
}

router.get('/ping', (req: Request, res: Response) => {
    console.log("PINGED")
    res.json({message: "It worked!"})
})
router.options('/api/', () => {
    const err = ApiError.badRequest("Invalid HTTP method")
    console.log(err);
    throw err;
});
// still needs middleware --> in project.route.ts
router.use('/api/projects', projectRouter);

router.use('/api/user', userRouter);

router.use('/api/update', updateRouter);

