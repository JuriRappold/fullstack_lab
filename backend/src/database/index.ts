// OBJECTS/FUNCTIONS
export { UserModel, ProjectModel, UpdateModel } from './schema.js';
export { db } from './connection.js';

//TYPES
export type {
    UserData,
    UserDocument,
    ProjectData,
    ProjectDocument,
    UpdateData,
    UpdateDocument,
    OBJECT_ID,
} from './schema.js';
export { ObjectId } from "mongodb";