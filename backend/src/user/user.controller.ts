import {asyncHandler} from "../middleware/asyncHandler.js";
import {
    ApiError, fullUser,
    httpCreated,
    httpOK,
    projectDTO,
    requestBody,
    responseBody,
    updateDTO,
    userDTO
} from "@fullstack-lab/utils";
import {Request, Response} from 'express';
import {
    register,
    logIn,
    getMeModel, getFullUserById
} from "./user.model.js";
import {format} from "./user.utils.js";
import * as http from "node:http";

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

export const getMe = asyncHandler( async (
    req: Request<never, responseBody<userDTO>, never>,
    res: Response<responseBody<userDTO>>
) => {
    // console.log(req.user);
    const user = await getMeModel(req.user.username);
    if(!user) throw ApiError.internal(`Something went wrong while fetching the user`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: user
    } satisfies responseBody<userDTO>);
})


export const getFullUser = asyncHandler( async (
    req: Request< {userId: string}, responseBody<fullUser>, never>,
    res: Response< responseBody<fullUser> >
) => {
    const userId = req.params.userId;

    const userFull = await getFullUserById(userId);
    if(!userFull) throw ApiError.notFound(`User not Found`);
    res.status(httpOK.status).json({
        status: httpOK.status,
        message: httpOK.message,
        data: userFull
    } satisfies responseBody<fullUser>)

})