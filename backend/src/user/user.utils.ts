import {UserData, UserDocument} from "../database/index.js";
import {userDTO} from "@fullstack-lab/utils";

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
// Does not strip the password
// const stripPassword = (user: userDTO) => {
//     const tmp: Exclude<userDTO, 'password'> = user;
//     return tmp;
// }
const stripPassword = (user: userDTO): userDTO => {
    const { password, ...rest} = user;
    return rest satisfies userDTO;
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