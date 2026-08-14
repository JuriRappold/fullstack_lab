import {
    updateDTO,
} from "@fullstack-lab/utils";
import { query } from './update.query.js'
import { format } from './update.utils.js'
import {UpdateDocument} from "../database/index.js";

/**
 * inserts new update data into DB. returns updateDTO if succesful, else returns null (http: 500)
 * @param newData updateDTO --> data to be inserted into DB
 * @param userId string -->
 */
export const createUpdate = async (newData: updateDTO, userId: string): Promise<updateDTO | null> => {
    const update: UpdateDocument | null = await query.create.newUpdate( format.DTOtoData(newData), userId );
    if (!update) return null; // DB error
    return format.DocumentToDTO(update);
}

/**
 * Reads updates of a given project, if the user is allowed.
 * @param projectId
 * @param userId
 * @return null if not allowed: http 403
 * @return updateDTO[] if allowed. Can be empty if there are no updates for a project
 */
export const getUpdatesOfProject = async (projectId: string, userId: string): Promise<updateDTO[] | null> => {
    const updates: UpdateDocument[] | null = await query.read.getUpdatesOf(projectId, userId);
    if (!updates) return null;
    return updates.map(format.DocumentToDTO);
}

/**
 * Reads the update of the given id, if the user is allowed.
 * @param updateId
 * @param userId
 * @return null if allowed & not found: http 404
 * @return updateDTO if allowed & found.
 * CAN THROW ERROR: passes queries throw ApiError.forbidden()
 */
export const getUpdateById = async ( updateId: string, userId: string): Promise<updateDTO | null> => {
    const update: UpdateDocument | null = await query.read.getUpdateById(updateId, userId);
    if(!update) return null;
    return format.DocumentToDTO(update);
}