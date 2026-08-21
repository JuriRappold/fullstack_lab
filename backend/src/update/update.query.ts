import {
    ProjectModel,
    UpdateData,
    UpdateDocument,
    UpdateModel,
} from "../database/index.js";

import {
    ApiError
} from "@fullstack-lab/utils";

/**
 * Checks ownership and contribution list for the user. Returns true if the userId is found, else it returns false.
 * @param projectId
 * @param userId
 */
async function checkIfAllowed(projectId: string, userId: string): Promise<boolean> {
    const project = await ProjectModel.findOne({
        _id: projectId,
        $or: [
            { owner_id: userId },
            { contributors: userId }
        ]
    });

    return project !== null;
}

async function addContributor(projectId: string, userId: string) {
    return ProjectModel.findOneAndUpdate(
        {
            id: projectId,
        },
        {
            $addToSet: {
                contributors: userId
            }
        },
        {
            new: true
        }
    )
}


/*
**CREATE**
* --> if the user is not in the contribution list of the project, add user to the contribution list
 */
/**
 * Returns null --> http: 500;
 * True in both cases (!result & UpdateMode.create())
 * @param newData
 * @param userId
 */
async function newUpdate(newData: UpdateData, userId: string): Promise<UpdateDocument | null> { //
    const projectId = newData.project_id.toString();
    if( ! (await checkIfAllowed( projectId, userId)) ){
        const result = await addContributor(projectId, userId);
        if(!result) return null;
    }
    return (await (await UpdateModel.create(newData)).populate('project_id', 'id title  status')).populate('contributor', 'id username');
}

/*
**READ**
 */
async function getUpdatesOfProject(projectId: string, userId: string): Promise<UpdateDocument[] | null> {
    // if(await checkIfAllowed(projectId, userId)) {
        //@ts-ignore
        return UpdateModel.find({project_id: projectId}).populate('project_id', 'id title  status').populate('contributor_id', 'id username');
    // }
    // return null;
}
async function getUpdateById( updateId: string, userId: string): Promise<UpdateDocument | null> {
    const tmp = await UpdateModel.findById(updateId).populate('project_id', 'id title status').populate('contributor_id', 'id username');
    // if(tmp && await checkIfAllowed(tmp.project_id._id.toString(), userId)) {
    //     //@ts-ignore
    //     return tmp;
    // }
    // else throw ApiError.forbidden(`Contribute to the Project First`);
    return tmp;
}
async function getUpdateOfUser( userId: string ): Promise<UpdateDocument[]> {
    //@ts-ignore
    return UpdateModel.find({contributor_id: userId}).populate('project_id', 'id title  status').populate('contributor_id', 'id username');
}

export const query = {
    create: {
        newUpdate
    },
    read: {
        getUpdatesOfProject,
        getUpdateById,
        getUpdateOfUser
    }
}
