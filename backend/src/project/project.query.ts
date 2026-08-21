/*
PURPOSE:
- queries the DB
*/
import {
    ProjectModel,
    ProjectDocument, ProjectData
} from '../database/index.js';
import {
    type partialProjectDTO,
} from '@fullstack-lab/utils';

/*
**CREATE**
- POST `/api/projects`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
*/
async function newProject(newProject: ProjectData): Promise<ProjectDocument> {
    return (await (await ProjectModel.create(newProject)).populate('owner_id', '_id username')).populate('contributors', '_id username');
}


/*
**READ**
- GET `/api/projects/:id`
	- --> specific project
- GET `/api/projects` or `/api/projects/:userId`
	- for the first one: use Gunnars method of a logged in User
	- otherwise use the second method
- returns 200
- returns 400 if invalid id
 */
async function projectById(projectId: string, userId: string): Promise<ProjectDocument | null> {
    //@ts-ignore
    return ProjectModel.findOne({_id: projectId}).populate('owner_id', 'id username').populate('contributors', 'id username');
}

async function projectsFrom(userId: string): Promise< ProjectDocument[] > {
    //@ts-ignore
    return ProjectModel.find({owner_id: userId}).populate('owner_id', 'id username').populate('contributors', 'id username');
}

async function projectsByIds(projectIds: string[], userId: string): Promise<ProjectDocument[]> {
    //@ts-ignore
    return ProjectModel.find({id: projectIds}).populate('owner_id', 'id username').populate('contributors', 'id username');
}
async function allProjects(): Promise<ProjectDocument[]>{
    //@ts-ignore
    return ProjectModel.find({}).select('id title status')
}
/*
**UPDATE**
- PATCH `/api/projects/:id`
	- requires request body
	- returns 200
	- returns 400 if no/insufficient req. body
	- returns 400 if invalid id
 */
async function updateProject(projectId: string, newData: partialProjectDTO, userId: string): Promise< ProjectDocument | null > {//: Promise< ProjectDocument >
    // if( await checkProjectOwnerShip(projectId, userId) ){
    //     const result = await ProjectModel.updateOne({_id: projectId}, newData);
    //     if(result.acknowledged){
    //         return ProjectModel.findById(projectId);
    //     }
    //     else return null;
    // }
    //@ts-ignore
    return ProjectModel.updateOne({id: projectId, $or: [{owner_id: userId}, {contributors: userId}]}, newData).populate('owner_id', 'id username').populate('contributors', 'id username');
}



/*
**DELETE**
- DELETE `/api/projects/:id`
	- returns 204/200
	- returns 400 if invalid id
	- returns 404 if id couldn't be found --> already deleted/never existed
	* : Promise<number>
 */
async function deleteById(projectId: string, userId: string) {
    return ProjectModel.deleteOne({id: projectId, $or: [{owner_id: userId}, {contributors: userId}]}).populate('owner_id', 'id username').populate('contributors', 'id username');
}
// async function checkProjectOwnerShip(projectId: string, userId: string) {
//     const project = await ProjectModel.findById(projectId);
//     if(!project) return null;//throw ApiError.notFound(`Project not found`);
//     if (project.owner_id.toString() != userId) throw ApiError.forbidden(`Not your project`);
//     return project;
// }

export const query = {
    create: {
        newProject
    },
    read: {
        projectById,
        projectsFrom,
        projectsByIds,
        allProjects,
    },
    update: {
        updateProject
    },
    delete: {
        deleteById
    }
}