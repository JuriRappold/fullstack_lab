import {updateDTO} from "@fullstack-lab/utils";
import {UpdateData, UpdateDocument} from "../database/index.js";
import {ObjectId} from "mongodb";


const DTOtoData = (dto: updateDTO): UpdateData => {
    return {
        title: dto.title,
        project_id: new ObjectId(dto.id),
        contributor_id: new ObjectId(dto.contributor.id),
        description: dto.description
    } satisfies UpdateData;
}

const DocumentToDTO = (doc: UpdateDocument): updateDTO => {
    return {
        title: doc.title,
        description: doc.description || "",
        project: doc.project_id,
        contributor: doc.contributor,
        id: doc.id
    } satisfies updateDTO;
}

export const format = {
    DTOtoData,
    DocumentToDTO
}