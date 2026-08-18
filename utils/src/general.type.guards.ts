export function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
}
export function isOptionalString(value: unknown): boolean {
    return value === undefined || typeof value === "string";
}
export function isOptionalStringArray(value: unknown): boolean {
    return (
        value === undefined ||
        (Array.isArray(value) && value.every(item => typeof item === "string"))
    );
}

