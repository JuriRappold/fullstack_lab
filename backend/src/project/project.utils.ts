import {
    ObjectId,
    ProjectData,
    ProjectDocument,
} from "../database/index.js";
import {minimalProject, projectDTO} from "@fullstack-lab/utils";

const DocumentToDTO = (queryResult: ProjectDocument): projectDTO => {
    return {
        title: queryResult.title,
        description: queryResult.description || "",
        status: queryResult.status,
        owner: queryResult.owner_id,
        contributors: queryResult.contributors,
        id: queryResult.id
    } satisfies projectDTO
}
const DTOToData = (proDTO: projectDTO): ProjectData => {
    return {
        title: proDTO.title,
        status: proDTO.status,
        owner_id: new ObjectId(proDTO.owner.id),
        contributors: proDTO.contributors.map( el => new ObjectId(el.id)),
    } satisfies ProjectData
}

const DocToMinimal = (min: ProjectDocument): minimalProject => {
    return {
        id: min.id,
        title: min.title
    } satisfies minimalProject
}

export const format = {
    DocumentToDTO,
    DTOToData,
    DocToMinimal
}