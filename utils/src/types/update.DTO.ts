import {isOptionalString} from "../general.type.guards.js";
import {
    minimalProject,
    isMinimalProject,
    isOptionalMinimalProject
} from "./project.DTO.js";
import {
    type minimalUser,
    isOptionalMinimalUser,
    isMinimalUser,
} from "./user.DTO.js";


/*
**UPDATE**
*/
export type updateDTO = {
    title: string,
    description: string,
    project: minimalProject,
    contributor: minimalUser,
    readonly id?: string
}
export type partialUpdateDTO = Omit<Partial<updateDTO>, 'project' | 'contributor'> & {
    project?: Partial<minimalProject>,
    contributor?: Partial<minimalUser>
};

export function isUpdateDTO(value: unknown): value is updateDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.description === "string" &&
        isMinimalProject(obj.project) &&
        isMinimalUser(obj.contributor) &&
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
        isOptionalMinimalProject(obj.project) &&
        isOptionalMinimalUser(obj.contributor) &&
        isOptionalString(obj.id)
    )
}

export type minimalUpdate = Required<Pick<updateDTO, 'title' | 'id'>>
export function isMinimalUpdate(value: unknown): value is minimalUpdate {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.title === "string" &&
        typeof obj.id === "string"
    );
}
export function isMinimalUpdateArray(value: unknown): value is minimalUpdate[] {
    return Array.isArray(value) && value.every(item => isMinimalUpdate(item));
}
export function isOptionalMinimalUpdate(value: unknown): boolean {
    return typeof value === "undefined" || isMinimalUpdate(value);
}
export function isOptionalMinimalUpdateArray(value: unknown): boolean {
    return typeof value === "undefined" || isMinimalUpdateArray(value);
}
