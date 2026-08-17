import {asyncHandler} from "../middleware/asyncHandler.js";
import {
    Request,
    Response
} from 'express';

import {
    responseBody,
    requestBody,
    updateDTO,
    isUpdateDTO,
    ApiError,
    httpCreated,
    httpOK
} from '@fullstack-lab/utils';
import {
    createUpdate,
    getUpdateById,
    getUpdatesOfProject,
    getUpdateOfUser
} from './update.model.js'


export const newUpdate = asyncHandler( async (
    req: Request<never, responseBody<updateDTO>, requestBody<updateDTO> >,
    res: Response< responseBody<updateDTO> >
) => {
    const { data } = req.body!;
    if( isUpdateDTO(data) ){
        const result = await createUpdate(data, req.user.id);
        if (!result) throw ApiError.internal(`Failed to add update`);
        res.status(httpCreated.status).json({
            status: httpCreated.status,
            message: httpCreated.message,
            data: result
        } satisfies responseBody<updateDTO>)
    }
    else throw ApiError.badRequest(`Bad Data`);
    return;
})

export const readUpdatesOfProject = asyncHandler( async(
    req: Request<{projectId: string}, responseBody<updateDTO[]>, never>,
    res: Response< responseBody<updateDTO[]> >
) => {
    const projectId = req.params.projectId;
    const result = await getUpdatesOfProject(projectId, req.user.id);
    if (!result) throw ApiError.forbidden(`Contribute to the Project First`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: result
    } satisfies responseBody<updateDTO[]>);
    return;
})

export const readUpdateById = asyncHandler( async(
    req: Request<{updateId: string}, responseBody<updateDTO>, never>,
    res: Response<responseBody<updateDTO>>
) => {
    const updateId = req.params.updateId;
    const userId = req.user.id
    const result = await getUpdateById(updateId, userId);
    if (!result) throw ApiError.notFound(`No update with the id found`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: result
    } satisfies responseBody<updateDTO>)
    return;
})

export const readUpdatesOfUser = asyncHandler( async(
    req: Request<never, responseBody<updateDTO[]>, never>,
    res: Response<responseBody<updateDTO[]>>
) => {
    const userId = req.user.id;
    const result = await getUpdateOfUser(userId);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: result
    } satisfies responseBody<updateDTO[]>);
    return;
})
