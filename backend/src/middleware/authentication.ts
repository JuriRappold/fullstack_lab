import {
    ApiError
} from '@fullstack-lab/utils';
import {asyncHandler} from "./asyncHandler.js";
import {verifyToken} from "./jwt.js";
import { query } from "../user/user.query.js";

/**
 * Verifies the Bearer JWT, confirms the user still exists in the DB,
 * and attaches { id, role } to req.user.
 *
 * DB lookup is intentional — it catches tokens belonging to deleted or
 * suspended accounts within the 7-day token window.
 */
export const authMiddleware = asyncHandler(async (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        throw ApiError.unauthorized('No token provided');
    }

    const token = header.split(' ')[1]!;
    const decoded = verifyToken(token); // throws on invalid / expired

    const currentUser = await query.read.userById(decoded.id)

    if (!currentUser) {
        throw ApiError.unauthorized('The user belonging to this token no longer exists.');
    }

    req.user = { username: currentUser.username, id: currentUser.id };
    next();
});