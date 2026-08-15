import type { Request, Response, NextFunction } from 'express';
import { ApiError } from "@fullstack-lab/utils";

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
        });
        return;
    }

    // Unexpected error — log and return generic 500
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        statusCode: 500,
    });
}