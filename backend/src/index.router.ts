import{Router, type Request, type Response } from 'express';
import {router as projectRouter} from './project/project.route.js'
import { router as userRouter} from './user/user.route.js';
import { router as updateRouter } from './update/update.route.js';



export const router = Router()


router.get('/ping', (req: Request, res: Response) => {
    console.log("PINGED")
    res.json({message: "It worked!"})
})

// still needs middleware --> in project.route.ts
router.use('/api/projects', projectRouter);

router.use('/api/user', userRouter);

router.use('/api/update', updateRouter);

