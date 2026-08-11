import{Router, type Express, type Request, type Response, type NextFunction } from 'express';



import { testing } from '@fullstack-lab/utils';

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