import{Router, type Request, type Response, type NextFunction } from 'express';
import {router as projectRouter} from './project/project.route.js'



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

// still needs middleware --> in project.route.ts
router.use('/api/projects', projectRouter)