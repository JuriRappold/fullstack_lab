import {isOptionalString, isOptionalStringArray, isStringArray} from "../general.type.guards.js";
import {
    userDTO,
    type minimalUser,
    isMinimalUser,
    isMinimalUserArray,
    isOptionalMinimalUser,
    isOptionalMinimalUserArray
} from "./user.DTO.js";
/*
**STATUS**
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
export function isOptionalStatus(value: unknown): boolean {
    return value === undefined || isStatus(value);
}

/*
**PROJECT**
 */
export type projectDTO = {
    title: string,
    description: string,
    status: STATUS,
    owner: minimalUser,
    contributors: minimalUser[]
    readonly  id?: string
}
export type partialProjectDTO = Partial<projectDTO>;
export type minimalProject = Required<Pick<projectDTO, 'title' | 'id'>> // add status?

export function isProjectDTO(value: unknown): value is projectDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.description === "string" &&
        isStatus(obj.status) &&
        isMinimalUser(obj.owner) &&
        isMinimalUserArray(obj.contributors) &&
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
        isOptionalMinimalUser(obj.owner) &&
        isOptionalMinimalUserArray(obj.contributors) &&
        isOptionalString(obj._id)
    );
}

export function isMinimalProject(value: unknown): value is minimalProject {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.id === "string"
    );
}
export function isOptionalMinimalProject(value: unknown): boolean {
    return typeof value === "string" || isMinimalProject(value);
}

export function isMinimalProjectArray(value: unknown): value is minimalProject[] {
    return Array.isArray(value) && value.every(item => isMinimalProject(item));
}
export function isOptionalMinimalProjectArray(value: unknown): boolean {
    return typeof value === "string" || isMinimalProjectArray(value)
}
