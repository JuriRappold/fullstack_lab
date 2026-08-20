import {
    isProjectDTO,
    isUpdateDTO,
    isUserDTO,
    type projectDTO,
    type updateDTO,
    type userDTO
} from "@fullstack-lab/utils";
import type {STATUS} from "@fullstack-lab/utils";

export type minEntity = {id: string,
    text: string,
    type: string,
    status?: STATUS
}
export function miniToEntity(enti: userDTO | projectDTO | updateDTO): minEntity {
    if(isUserDTO(enti)){
        return {
            id: enti.id ?? "",
            text: enti.username,
            type: "user"
        }satisfies minEntity
    }
    else if (isProjectDTO(enti)) {
        return {
            id: enti.id ?? "",
            text: enti.title,
            type: "projects",
            status: enti.status
        } satisfies minEntity
    }
    else if(isUpdateDTO(enti)) {
        return {
            id: enti.id ?? "",
            text: enti.title,
            type: "update"
        } satisfies minEntity
    }
    else throw new Error("Failed to Format");
}