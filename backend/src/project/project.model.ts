/*
PURPOSE:
- calls on queries
- transforms queries into DTO
- check if id is a valid UUID
 */
import { query } from "./project.query.js";
import {
    ApiError,
    partialProjectDTO,
    projectDTO,
} from '@fullstack-lab/utils'
import {
    format,
} from './project.utils.js'


/*
**CREATE**
- POST `/api/projects`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
*/
export const createProject = async (newProject: projectDTO): Promise<projectDTO> => {
    const success = await query.create.newProject(newProject);
    return format.DocumentToDTO(success);
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

export const getProjectBy = async (projectId: string): Promise<projectDTO | null> => {
    const project = await query.read.projectById(projectId);
    if(!project) return null;
    else {
        return format.DocumentToDTO(project);
    }
}
export const getProjectFrom = async (userId: string): Promise<projectDTO[]> => {
    const projects = await query.read.projectsFrom(userId);
    return projects.map(format.DocumentToDTO);
}


export const delProjectId = async (projectId: string): Promise<boolean> => {
    const result = await query.delete.deleteById(projectId);
    return result.acknowledged;
}

export const updateProById = async (projectId: string, newData: partialProjectDTO) => {
//     return query.update.updateProject(
//         projectId,
//         newData
//     )
    const result = await query.update.updateProject(projectId, newData);
    if(!result) return result;
    else{
        return format.DocumentToDTO(result);
    }
}
