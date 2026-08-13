import bcrypt from 'bcrypt';
import {UserData, UserDocument} from "../database/index.js";
import {userDTO} from "@fullstack-lab/utils";

export const hashPassword = async (plaintextPW: string) => {
    const SALT: number = Number(process.env.SALT_ROUNDS) || 10;
    return await bcrypt.hash(plaintextPW, SALT);
}
export const compareHashedPassword = async (plainPW: string, hashedPW: string) => {
    return await bcrypt.compare(plainPW, hashedPW);
}
const DocumentToDTO = (userDoc: UserDocument, token: string = '') => {
    if(!token){
        return {
            username: userDoc.username,
            id: userDoc.id
        } satisfies userDTO;
    }
    else{
        return {
            username: userDoc.username,
            id: userDoc.id,
            token
        } satisfies userDTO;
    }
}
const DTOtoData = (userDto: userDTO) => {
    return {
        username: userDto.username,
        password: userDto.password || ''
    } satisfies UserData
}
const stripPassword = (user: userDTO) => {
    const tmp: Exclude<userDTO, 'password'> = user;
    return tmp;
}
export const format = {
    DocumentToDTO,
    DTOtoData,
    stripPassword,
}

declare global {
    namespace Express {
        interface Request {
            user: {
                username: string;
                id: string;
            };
        }
    }
}