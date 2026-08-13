import {
    ObjectId,
    ProjectData,
    ProjectDocument
} from "../database/index.js";
import { projectDTO } from "@fullstack-lab/utils";

const DocumentToDTO = (queryResult: ProjectDocument) => {
    return {
        title: queryResult.title,
        description: queryResult.description || "",
        status: queryResult.status,
        owner_id: queryResult.owner_id.toString(),
        contributors: queryResult.contributors.map( e => e.toString()),
        _id: queryResult._id.toString() || ""
    } satisfies projectDTO
}
const DTOToData = (proDTO: projectDTO): ProjectData => {
    return {
        title: proDTO.title,
        status: proDTO.status,
        owner_id: new ObjectId(proDTO.owner_id),
        contributors: proDTO.contributors.map( el => new ObjectId(el)),
    } satisfies ProjectData
}

export const format = {
    DocumentToDTO,
    DTOToData
}