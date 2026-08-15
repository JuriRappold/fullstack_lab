import type { Request, Response, NextFunction } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

/**
 * Type adapter for async route handlers.
 *
 * In Express 5, async errors are forwarded to next() automatically
 * no .catch(next) wrapper needed. The only job of this function is to
 * let controllers narrow req.params and res body types without TypeScript
 * rejecting the handler as incompatible with router.patch() etc.
 *
 * This code came from the Fullstack Group Project:
 * Link: https://github.com/jasminerezai/hkif-web/blob/main/server/src/middleware/asyncHandler.ts
 */
export function asyncHandler<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery extends ParsedQs = ParsedQs,
>(
    fn: (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>,
        next: NextFunction,
    ) => Promise<void>,
) {
    return fn;
}