import {Schema, InferSchemaType, createConnection, HydratedDocument} from 'mongoose';

/* Connection --> acutally lets import it from the connection.ts?
--> i think connection.ts is some kind fo manual way of createConnection...
 */
const uri: string = process.env.dev_DB_URL || "";
if (!uri) {
    throw new Error(`DB_URL not defined`);
}
export const connection = createConnection(uri);

// SCHEMAS

/*
| **USER**    |
|-------------|
| username    |
| password    |
 */

export const userSchema = new Schema({
    // limit length?
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
})



/*
| **PROJECT**   |
|---------------|
| title         |
| description   |
| status        |
| owner-id      |
| contributors  | --> maybe not nested
 */

export const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 500
    },
    status: {
        type: String,
        enum: ["IDEA", "DESIGN", "WIP", "FINISHED", "ARCHIVED"],
        default: "IDEA"
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
})


/*
| **UPDATES**    |
|----------------|
| title          |
| description    |
| project-id     |
| contributor-id |
 */

export const updateSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 500
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    contributor_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// MODELS
export const UserModel = connection.model('User', userSchema);
export const ProjectModel = connection.model('Project', projectSchema);
export const UpdateModel = connection.model('Update', updateSchema);


// INFERRED TYPES
export type UserData = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument< UserData >;

export type ProjectData = InferSchemaType<typeof projectSchema>;
export type projectDocument = HydratedDocument< ProjectData >;
export type ProjectDocument = Omit<projectDocument, 'owner_id' | 'contributors'> & {
    owner_id: Pick<UserDocument, 'id' | 'username'>,
    contributors: Pick<UserDocument, 'id' | 'username'>[],
}

export type UpdateData = InferSchemaType<typeof updateSchema>;
export type updateDocument = HydratedDocument< UpdateData >;
export type UpdateDocument = Omit<updateDocument, 'project_id' | 'contributor'> & {
    project_id: Pick<projectDocument, 'id' | 'title' | 'status'>,
    contributor_id: Pick<UserDocument, 'id' | 'username'>
}

export type OBJECT_ID = Schema.Types.ObjectId

// export const closeConnection = connection.close;