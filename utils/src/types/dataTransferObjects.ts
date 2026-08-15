function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
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

export type projectDTO = {
    title: string,
    description: string,
    status: STATUS,
    owner_id: string,
    contributors: string[]
    readonly  _id?: string
}
export type partialProjectDTO = Partial<projectDTO>;

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


/*
**USER**
 */
export type userDTO = {
    username: string,
    password?: string,
    token?: string,
    readonly id?: string
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

export type partialUserDTO = Partial<userDTO>
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


/*
**UPDATE**
*/
export type updateDTO = {
    title: string,
    description: string,
    project_id: string,
    contributor_id: string,
    readonly id?: string
}
export type partialUpdateDTO = Partial<updateDTO>;

export function isUpdateDTO(value: unknown): value is updateDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.description === "string" &&
        typeof obj.project_id === "string" &&
        typeof obj.contributor_id === "string" &&
        isOptionalString(obj.id)
    );
}
export function isPartialUpdateDTO(value:unknown): value is partialUpdateDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        isOptionalString(obj.title) &&
        isOptionalString(obj.description) &&
        isOptionalString(obj.project_id) &&
        isOptionalString(obj.contributor_id) &&
        isOptionalString(obj.id)
    )
}
