import {
    ApiError,
    isUUID
} from '@fullstack-lab/utils'
import type {
    Request,
    Response,
    NextFunction
} from "express";


export const checkID = (req: Request, res: Response, next: NextFunction) => {
    if (req.params){
        const id: string | string[] = req.params.id ?? req.params.projectId ?? req.params.userId ?? req.params.updateId;
        if(typeof id === "string" && isUUID.test(id)) {
            next();
            return;
        }
        else throw ApiError.badRequest(`Invalid ID in parameter`);
    }
}