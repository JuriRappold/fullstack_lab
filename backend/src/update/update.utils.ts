import {updateDTO} from "@fullstack-lab/utils";
import {UpdateData, UpdateDocument} from "../database/index.js";
import {ObjectId} from "mongodb";

const DTOtoData = (dto: updateDTO): UpdateData => {
    return {
        title: dto.title,
        project_id: new ObjectId(dto.project_id),
        contributor_id: new ObjectId(dto.contributor_id),
        description: dto.description
    } satisfies UpdateData;
}
const DocumentToDTO = (doc: UpdateDocument): updateDTO => {
    return {
        title: doc.title,
        description: doc.description || "",
        project_id: doc.project_id.toString(),
        contributor_id: doc.contributor_id.toString(),
        id: doc.id
    } satisfies updateDTO;
}

export const format = {
    DTOtoData,
    DocumentToDTO
}