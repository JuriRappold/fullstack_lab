/*
PURPOSE:
- calls on queries
- transforms queries into DTO
- check if id is a valid UUID
 */
import {query} from "./project.query.js";
import {minimalProject, partialProjectDTO, projectDTO,} from '@fullstack-lab/utils'
import {format,} from './project.utils.js'
import {ProjectDocument} from "../database/index.js";


/*
**CREATE**
- POST `/api/projects`
	- requires request body
	- returns 201
	- returns 400 if no/insufficient req. body
	- returns 409 if project title not unique
*/
export const createProject = async (newProject: projectDTO): Promise<projectDTO> => {
    const formatted = format.DTOToData(newProject)
    const result = await query.create.newProject(formatted);
    return format.DocumentToDTO(result);

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
// const unAuth = -1 as const;

export const getProjectBy = async (projectId: string, userId: string): Promise<projectDTO | null> => {
    let project: ProjectDocument | projectDTO | null = await query.read.projectById(projectId, userId);
    if(!project) return null;
    project = format.DocumentToDTO(project);
    // if(!format.isContributor(userId, project.contributors) && project.owner.id.toString() !== userId )  return -1;
    return project;
}
export const getProjectFrom = async (userId: string): Promise<projectDTO[]> => {
    const projects: ProjectDocument[] = await query.read.projectsFrom(userId);
    return projects.map(format.DocumentToDTO);
}


export const delProjectId = async (projectId: string, userId: string): Promise<boolean> => {
    const result = await query.delete.deleteById(projectId, userId);
    return result.acknowledged;
}

export const updateProById = async (projectId: string, newData: partialProjectDTO, userId: string) => {
    const result = await query.update.updateProject(projectId, newData, userId);
    return result ? format.DocumentToDTO(result) : result;
}

export const getAllMinimalProjects = async (): Promise<minimalProject[]> => {
    const minProjects: ProjectDocument[] = await query.read.allProjects();
    return minProjects.map(format.DocToMinimal);
}
