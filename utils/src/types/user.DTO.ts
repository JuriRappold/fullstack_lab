import {isOptionalString} from "../general.type.guards.js";

/*
**USER**
 */
export type userDTO = {
    username: string,
    password?: string,
    token?: string,
    readonly id?: string
}
export type minimalUser = Required<Pick<userDTO, 'username' | 'id'>>;
export type partialUserDTO = Partial<userDTO>

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

export function isPartialUserDTO(value: unknown): value is partialUserDTO {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;
    return (
        isOptionalString(obj.username) &&
        isOptionalString(obj.password) &&
        isOptionalString(obj.token) &&
        isOptionalString(obj.id)
    );
}

export function isMinimalUser(value: unknown): value is minimalUser {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;
    return (
        typeof obj.username === "string" &&
        typeof obj.id === "string"
    )

}
export function isMinimalUserArray(value: unknown): value is minimalUser[] {
    return Array.isArray(value) && value.every(item => isMinimalUser(item));
}
export function isOptionalMinimalUser(value: unknown): boolean {
    return (
        value === undefined || isMinimalUser(value)
    );
}
export function isOptionalMinimalUserArray(value: unknown): boolean {
    return (
        value === undefined || isMinimalUserArray(value)
    );
}