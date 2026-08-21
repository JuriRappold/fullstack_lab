import { query } from './user.query.js';
import {
    format,
} from "./user.utils.js";
import {
    generateToken,
} from '../middleware/jwt.js';
import {
    hashPassword,
    compareHashedPassword,
} from '../middleware/hashPassword.js';
import {
    ApiError,
    userDTO,
    minimalUser,
    fullUser
} from "@fullstack-lab/utils";
import {ProjectDocument, UpdateDocument, UserDocument} from "../database/index.js";

import { query as projectQuery } from '../project/project.query.js';
import { format as projectFormat } from '../project/project.utils.js';

import { query as updateQuery } from '../update/update.query.js';
import { format as updateFormat } from '../update/update.utils.js';

export const logIn = async (username: string, password: string): Promise<userDTO> =>  {
    const user: UserDocument | null = await query.read.userByName(username);
    if (!user) throw ApiError.unauthorized(`Invalid username or password: No User`)
    else {
        const isMatch = await compareHashedPassword(password, user.password);
        if(!isMatch) throw ApiError.unauthorized(`Invalid username or password`);
        const token = generateToken(user.username, user.id);
        return format.DocumentToDTO(user, token);
    }
}
export const register = async (username: string, password: string): Promise<userDTO> => {
    if(await query.read.doesUserExist(username)) throw ApiError.conflict(`User with username already exists`)

    const hashedPW: string = await hashPassword(password);

    const user = await query.create.newUser(username, hashedPW);

    const token = generateToken(user.username, user.id);

    return format.DocumentToDTO(user, token);
}

export const getMeModel = async (username: string): Promise<userDTO | null> =>  {
    const tmp: UserDocument | null = await query.read.userByName(username);
    if (!tmp) return tmp;
    return format.DocumentToDTO(tmp);
}

export const getUsersById = async (userIds: string[]): Promise<minimalUser[]> => {
    const userDocs: UserDocument[] = await query.read.usersByIds(userIds)
    const users: minimalUser[] = [];
    userDocs.forEach( el => {
        if (userIds.includes(el.id)){
            users.push({id: el.id, username: el.username});
        }
    });

    return users;


}

export const getFullUserById = async (userId: string): Promise<fullUser | null> => {
    const userDoc: UserDocument | null = await query.read.userById(userId)
    if(!userDoc) return null; //404 user not found
    const userDto = format.DocumentToDTO(userDoc);

    const project: ProjectDocument[] = await projectQuery.read.projectsFrom(userId);
    const projectDto = project.map(projectFormat.DocumentToDTO);

    const update: UpdateDocument[] = await updateQuery.read.getUpdateOfUser(userId);
    const updateDto = update.map(updateFormat.DocumentToDTO);

    return {
        username: userDto.username,
        id: userDto.id,
        projects: projectDto,
        updates: updateDto
    } satisfies fullUser

}
