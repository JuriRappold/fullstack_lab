/*
PURPOSE:
- queries the DB
*/
import {
    ProjectModel,
    ProjectDocument,
} from '../database/index.js';
import {
    ApiError,
    type partialProjectDTO,
    type projectDTO,
} from '@fullstack-lab/utils';

/*
**CREATE**
- POST `/api/projects`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
*/
async function newProject(newProject: projectDTO): Promise<ProjectDocument> {
    if (newProject._id) throw ApiError.badRequest('Remove ID');
    return await ProjectModel.create(newProject);
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
    return await checkProjectOwnerShip(projectId, userId)
}

async function projectsFrom(userId: string): Promise< ProjectDocument[] > {
    return ProjectModel.find({owner_id: userId});
}
/*
**UPDATE**
- PATCH `/api/projects/:id`
	- requires request body
	- returns 200
	- returns 400 if no/insufficient req. body
	- returns 400 if invalid id
 */
async function updateProject(projectId: string, newData: partialProjectDTO, userId: string) {//: Promise< ProjectDocument >
    if( await checkProjectOwnerShip(projectId, userId) ){
        const result = await ProjectModel.updateOne({_id: projectId}, newData);
        if(result.acknowledged){
            return ProjectModel.findById(projectId);
        }
        else return null;
    }
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
    if( await checkProjectOwnerShip(projectId, userId) ) return ProjectModel.deleteOne({_id: projectId});
    return { acknowledged: false };
}
async function checkProjectOwnerShip(projectId: string, userId: string) {
    const project = await ProjectModel.findById(projectId);
    if(!project) return null;//throw ApiError.notFound(`Project not found`);
    if (project.owner_id.toString() != userId) throw ApiError.forbidden(`Not your project`);
    return project;
}

export const query = {
    create: {
        newProject
    },
    read: {
        projectById,
        projectsFrom,
    },
    update: {
        updateProject
    },
    delete: {
        deleteById
    }
}