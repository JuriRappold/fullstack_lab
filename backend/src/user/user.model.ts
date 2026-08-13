import { query } from './user.query.js';
import {
    hashPassword,
    compareHashedPassword, format,
} from "./user.utils.js";
import {
    generateToken,
} from '../middleware/jwt.js'
import {ApiError, userDTO} from "@fullstack-lab/utils";
import {UserDocument} from "../database/index.js";

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
