export type responseBody<T> = {
    status: number,
    message: string
    data: T
}

export type responseError = {
    error: string,
    statusCode: number
}

export function isResponseError(value: unknown): value is responseError {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    const validKeys = ["error", "statusCode"];
    const keysOfvalue = Object.keys(obj);
    const props = keysOfvalue.filter( k => validKeys.includes(k));
    if(props.length !== 2) return false;
    return (
        typeof obj.error === "string" &&
        typeof obj.statusCode === "number" );
    // const isBody = (typeof obj.status === "number" && typeof obj.message ==="string" && Object.hasOwn(obj, "data"));
    // if (isError && !isBody) return isError;
}
function isResponseBody<T>(value: unknown): value is responseBody<T>{
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (typeof obj.status === "number" && typeof obj.message ==="string" && Object.hasOwn(obj, "data"));
}
