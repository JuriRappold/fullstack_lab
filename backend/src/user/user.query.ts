import {
    UserModel,
    UserDocument
} from '../database/index.js'
import { ObjectId } from "mongodb";

/*
**CREATE**
 */
const newUser = async (username: string, password: string): Promise<UserDocument> => {
    return UserModel.create({username, password});
}
/*
**READ**
 */
const userByName = async (username: string):Promise<UserDocument | null> => {
    return UserModel.findOne({username});
}
const userById = async(userId: string): Promise<UserDocument | null> => {
    return UserModel.findById(userId);
}
/**
 * returns {_id: ObjectId} if document exists, otherwise it returns null
 * @param username
 */
const doesUserExist = async(username: string): Promise<{_id: ObjectId} | null> => {
    return UserModel.exists({username});
}





export const query = {
    create: {
        newUser
    },
    read: {
        userByName,
        doesUserExist,
        userById
    },
}

