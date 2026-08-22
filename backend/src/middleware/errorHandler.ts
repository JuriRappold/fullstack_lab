import type { Request, Response, NextFunction } from 'express';
import {ApiError, httpConflict, httpUnauthorized, type responseError} from "@fullstack-lab/utils";
import {JsonWebTokenError} from "jsonwebtoken";
import {MongoError} from "mongodb";

/**
 * Global error handler middleware.
 * Must be registered LAST in the middleware chain (after all routes).
 *
 * This code came from the Fullstack Group Project:
 * Link: https://github.com/jasminerezai/hkif-web/blob/main/server/src/middleware/errorHandler.ts
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            error: err.message,
            statusCode: err.statusCode,
        } satisfies responseError);
        return;
    }
    if( err.name === "JsonWebTokenError"){
        res.status(httpUnauthorized.status).json({
            error: err.message,
            statusCode: httpUnauthorized.status
        }satisfies responseError)
        return;
    }
    if(err instanceof MongoError){
 if(err.code === 11000) {
             res.status(httpConflict.status).json({
                 error: `Duplicate Key`,
                 statusCode: httpConflict.status
             } satisfies responseError)
             return;
        }
        res.status(500).json({err,type: typeof err});
        return;
    }

    // Unexpected error — log and return generic 500
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error: ' + JSON.stringify(err),
        statusCode: 500,
    } satisfies responseError);
}