export interface DTO {}

/*
| **PROJECT**   |
|---------------|
| title         |
| description   |
| status        | --> enum: ["IDEA", "DESIGN", "WIP", "FINISHED", "ARCHIVED"]
| owner-id      |
| contributors  | --> list
 */
const statuses = [
    "IDEA",
    "DESIGN",
    "WIP",
    "FINISHED",
    "ARCHIVED",
] as const;
export type STATUS = typeof statuses[number];
export function isStatus(value: unknown): value is STATUS {
    return typeof value === "string" && statuses.includes(value as STATUS);
}

export interface projectDTO extends DTO {
    title: string,
    description: string,
    status: STATUS,
    owner_id: string,
    contributors: string[]
    readonly  _id?: string
}

export interface partialProjectDTO extends DTO {
    title?: string,
    description?: string,
    status?: STATUS,
    owner_id?: string, // can't use object-id here, bc circular import
    contributors?: string[]
    readonly  _id?: string
}
export function getProjectDTO(obj: projectDTO){
    //limit title to 50 char
    if(obj.title.length > 50) throw new Error('The title is too long.');
    //limit description to 500
    if(obj.description.length > 500) throw new Error('The description is too long.');

    if (obj.contributors.length < 1 || obj.contributors[0] != obj.owner_id) throw new Error('No/Invalid Contributors');
    //id-reggex?

    const DTO: projectDTO = {
        title: obj.title,
        description: obj.description,
        status: obj.status,
        owner_id: obj.owner_id,
        contributors: obj.contributors,
        _id: obj._id
    } satisfies projectDTO;

    return DTO;
}
export function getPartialProjectDTO(obj: partialProjectDTO){
    //limit title to 50 char
    if(obj.title && obj.title.length > 50) throw new Error('The title is too long.');
    //limit description to 500
    if(obj.description && obj.description.length > 500) throw new Error('The description is too long.');

    if (obj.contributors && (obj.contributors.length < 1 || obj.contributors[0] != obj.owner_id) ) throw new Error('No/Invalid Contributors');

    const DTO: partialProjectDTO = {
        title: obj.title,
        description: obj.description,
        status: obj.status,
        owner_id: obj.owner_id,
        contributors: obj.contributors
    } satisfies partialProjectDTO

    return DTO;
}

export function isProjectDTO(value: unknown): value is projectDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.description === "string" &&
        isStatus(obj.status) &&
        typeof obj.owner_id === "string" &&
        isStringArray(obj.contributors) &&
        (obj._id === undefined || typeof obj._id === "string")
    );
}
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
}

export function isPartialProjectDTO( value: unknown): value is partialProjectDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        isOptionalString(obj.title) &&
        isOptionalString(obj.description) &&
        isOptionalStatus(obj.status) &&
        isOptionalString(obj.owner_id) &&
        isOptionalStringArray(obj.contributors) &&
        isOptionalString(obj._id)
    );
}

function isOptionalString(value: unknown): boolean {
    return value === undefined || typeof value === "string";
}
function isOptionalStatus(value: unknown): boolean {
    return value === undefined || isStatus(value);
}
function isOptionalStringArray(value: unknown): boolean {
    return (
        value === undefined ||
        (Array.isArray(value) && value.every(item => typeof item === "string"))
    );
}

/*
**USER**
 */
export interface userDTO extends DTO {
    username: string,
    password?: string,
    token?: string,
    id?: string
}
export function isUserDTO(value: unknown): value is userDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;
    return (
        typeof obj.username === "string" &&
        isOptionalString(obj.password) &&
        isOptionalString(obj.token)
    );
}

export interface partialUserDTO extends DTO {
    username?: string,
    password?: string,
    token?: string,
    id?: string
}
export function isPartialUserDTO(value: unknown): value is partialUserDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;
    return isOptionalString(obj.username) &&
        isOptionalString(obj.password) &&
        isOptionalString(obj.token) &&
        isOptionalString(obj.id);
}
