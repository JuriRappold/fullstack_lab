import {updateDTO} from "@fullstack-lab/utils";
import {UpdateData, UpdateDocument} from "../database/index.js";
import {ObjectId} from "mongodb";


const DTOtoData = (dto: updateDTO): UpdateData => {
    return {
        title: dto.title,
        project_id: new ObjectId(dto.project.id),
        contributor_id: new ObjectId(dto.contributor.id),
        description: dto.description
    } satisfies UpdateData;
}

const DocumentToDTO = (doc: UpdateDocument): updateDTO => {
    return {
        title: doc.title,
        description: doc.description || "",
        project: {id: doc.project_id.id, title: doc.project_id.title, status: doc.project_id.status},
        contributor: {id: doc.contributor_id.id, username: doc.contributor_id.username},
        id: doc.id
    } satisfies updateDTO;
}

export const format = {
    DTOtoData,
    DocumentToDTO
}