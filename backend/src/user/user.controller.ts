import {asyncHandler} from "../middleware/asyncHandler.js";
import {ApiError, httpCreated, httpOK, requestBody, responseBody, userDTO} from "@fullstack-lab/utils";
import {Request, Response} from 'express';
import {
    register,
    logIn
} from "./user.model.js";
import {format} from "./user.utils.js";

export const registerNewUser = asyncHandler(async (
    req: Request<never, responseBody<userDTO>, requestBody<userDTO> >,
    res: Response<responseBody<userDTO>>
) => {

    const {data} = req.body!;
    if(!data) throw ApiError.badRequest('Invalid password or username')
    let newUser = await register(data.username, data.password!);
    newUser = format.stripPassword(newUser);
    res.status(httpCreated.status).json({
        status: httpCreated.status,
        message: httpCreated.message,
        data: newUser
    } satisfies responseBody<userDTO>)
})

export const logInUser = asyncHandler( async (
    req: Request<never, responseBody<userDTO>, requestBody<userDTO>>,
    res: Response< responseBody<userDTO> >
) => {
    const user = req.body!.data!;
    let result: userDTO | null = await logIn(user.username, user.password!);
    if (!result) throw ApiError.internal(`something went wrong while loggin in`);
    result = format.stripPassword(result);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: result
    } satisfies responseBody<userDTO>)
})