import {
    ObjectId,
    ProjectData,
    ProjectDocument,
} from "../database/index.js";
import {minimalProject, partialProjectDTO, projectDTO} from "@fullstack-lab/utils";

// const none = "NONE";
// const uuid = new ObjectId("00000000-0000-0000-0000-000000000000");

const DocumentToDTO = (queryResult: ProjectDocument): projectDTO => {
    // console.log(queryResult);
    return {
        title: queryResult.title,
        description: queryResult.description || "",
        status: queryResult.status,
        owner: {id: queryResult.owner_id.id, username: queryResult.owner_id.username},
        contributors: queryResult.contributors.map(c => {
            return {id: c.id, username: c.username}
        }),
        id: queryResult.id
    } satisfies projectDTO
}
const DTOToData = (proDTO: projectDTO): ProjectData => {
    return {
        title: proDTO.title,
        status: proDTO.status,
        owner_id: new ObjectId(proDTO.owner.id),
        contributors: proDTO.contributors.map( el => new ObjectId(el.id)),
        description: proDTO.description
    } satisfies ProjectData
}

const updateToData = (proDTO: partialProjectDTO): Partial<ProjectData> => {
    const data: Partial<ProjectData> = {};
    if (proDTO.title !== undefined) {
        data.title = proDTO.title;
    }
    if (proDTO.description !== undefined) {
        data.description = proDTO.description;
    }

    if (proDTO.status !== undefined) {
        data.status = proDTO.status;
    }

    if (proDTO.owner?.id !== undefined) {
        data.owner_id = new ObjectId(proDTO.owner.id);
    }

    if (proDTO.contributors !== undefined) {
        data.contributors = proDTO.contributors.map(
            c => new ObjectId(c.id)
        );
    }


    return data;
};



const DocToMinimal = (min: ProjectDocument): minimalProject => {
    return {
        id: min.id,
        title: min.title,
        status: min.status,
    } satisfies minimalProject
}

const isContributor = (userId: string, contributors: {id: string, username: string}[]) => {
    const tmp = contributors.filter( c => c.id === userId)
    return tmp.length > 0;
}

export const format = {
    DocumentToDTO,
    DTOToData,
    DocToMinimal,
    isContributor,
    updateToData,
}
