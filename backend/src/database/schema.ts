import { Schema, InferSchemaType, createConnection } from 'mongoose';

// Connection
const uri: string = process.env.dev_DB_URL || "";
if (!uri) {
    throw new Error(`DB_URL not defined`);
}
const connection = createConnection(uri);

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
export const User = connection.model('User', userSchema);
export const Project = connection.model('Project', projectSchema);
export const Update = connection.model('Update', updateSchema);


// INFERRED TYPES
export type USER = InferSchemaType<typeof userSchema>;
export type PROJECT = InferSchemaType<typeof projectSchema>;
export type UPDATE = InferSchemaType<typeof updateSchema>;
