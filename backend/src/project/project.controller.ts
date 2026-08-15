/*
PURPOSE:
- catches errors
- calls the correct model
- formats returned data into the response shape
 */

import {asyncHandler} from '../middleware/asyncHandler.js';
import {
    ApiError,
    httpCreated,
    httpOK,
    isPartialProjectDTO,
    isProjectDTO,
    isUUID,
    partialProjectDTO,
    projectDTO,
    requestBody,
    responseBody,
} from "@fullstack-lab/utils";
import {Request, Response} from 'express';
import {createProject, delProjectId, getProjectBy, getProjectFrom, updateProById} from './project.model.js'
import {MongoServerError} from "mongodb";

/*
**CREATE**
- POST `/api/projects`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
*/
export const createNewProject = asyncHandler( async (
    req: Request< never, responseBody<projectDTO>, requestBody<projectDTO> >, //{ userId: string }
    res: Response<responseBody<projectDTO>>
) => {
    const { data } = req.body
    if (!data) throw ApiError.badRequest(`No new data to create new project: ${data}`);

    if (isProjectDTO(data)){
        try {
            const newProject: projectDTO = await createProject(data)
            if (!newProject) throw ApiError.internal(`Something went wrong: ${data}`);
            res.status(httpCreated.status).json({
                status: httpCreated.status,
                message: httpCreated.message,
                data: newProject
            } satisfies responseBody<projectDTO>);
        } catch(e) {
            if ( e instanceof MongoServerError ){
                if(e.code === 11000) throw ApiError.conflict(`Check the Title: ${JSON.stringify(e.keyValue)}`);
                else throw ApiError.internal(`Something went wrong: ${e.errorResponse}`);
            }
            throw ApiError.internal(`Something went wrong: ${e}`);

        }
    }
    else throw ApiError.badRequest(`Bad Data: ${data}`);
    return;
})



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

export const getProjectById = asyncHandler( async (
    req: Request< { id: string }, responseBody<projectDTO>, never >,
    res: Response<responseBody<projectDTO>>
) => {
    //parse id
    const projectId: string = req.params.id;
    if(!isUUID.test(projectId)) throw ApiError.badRequest(`Invalid UUID: ${projectId}`);
    //query
    const project = await getProjectBy(projectId, req.user.id)
    if(!project) throw ApiError.notFound(`Project with id ${projectId} was not found`);
    //send response
    if (project._id != req.user.id) throw ApiError.forbidden(`Not your Project`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: project
    } satisfies responseBody<projectDTO>)
    return;
})

export const getProjectsOfUser = asyncHandler( async (
    req: Request< { userId: string }, responseBody<projectDTO[]>, never >,
    res: Response<responseBody<projectDTO[]>>
) => {
    const userId = req.user.id
    if(!isUUID.test(userId)) throw ApiError.badRequest(`Invalid UUID: ${userId}`);
    const projects: projectDTO[] = await getProjectFrom(userId);
    // if (project._id != req.user.id) throw ApiError.forbidden(`Not your Project`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: projects
    } satisfies responseBody<projectDTO[]>)
})


export const deleteProjectById = asyncHandler( async(
    req: Request< {id: string}, responseBody<null>, never >,
    res: Response<responseBody<null>>
) => {
    const projectId = req.params.id;
    if(!isUUID.test(projectId)) throw ApiError.badRequest(`Invalid UUID: ${projectId}`);

    const deleted = await delProjectId(projectId, req.user.id);

    if(!deleted) throw ApiError.internal(`Failed to delete ${projectId}`);

    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: null
    })
    return;
})

export const updateProjectById = asyncHandler( async(
    req: Request<{id: string}, responseBody<projectDTO>, requestBody<partialProjectDTO>>,
    res: Response<responseBody<projectDTO>>
) => {
    const projectId = req.params.id;
    if(!isUUID.test(projectId)) throw ApiError.badRequest(`Invalid UUID: ${projectId}`);
    const {data} = req.body;
    if(!data) throw ApiError.badRequest(`Include data`)
    if(isPartialProjectDTO(data)) {
        const result = await updateProById(projectId, data, req.user.id);
        if(!result) throw ApiError.notFound();
        else{
            res.status(httpOK.status).json({
                status: httpOK.status,
                message: httpOK.message,
                data: result
            } satisfies responseBody<projectDTO>)
        }
    }
    else throw ApiError.badRequest(`Invalid Data: ${JSON.stringify(data)}`);
})