import {
    httpInternal, // 500
    httpBadRequest, //400
    httpConflict, //409
    httpForbidden, //403
    httpNotFound, //404
    httpUnauthorized
} from './types/index.js'

/**
 * Custom API error class with HTTP status code.
 * This class is from the Fullstack Lab
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string = httpBadRequest.message): ApiError {
        return new ApiError(400, message);
    }

    static notFound(message: string = httpNotFound.message): ApiError {
        return new ApiError(404, message);
    }

    static conflict(message: string = httpConflict.message): ApiError {
        return new ApiError(409, message);
    }

    static unauthorized(message: string = httpUnauthorized.message): ApiError {
        return new ApiError(401, message);
    }

    static forbidden(message: string = httpForbidden.message): ApiError {
        return new ApiError(403, message);
    }

    static internal(message: string = httpInternal.message): ApiError {
        return new ApiError(500, message, false);
    }
}
