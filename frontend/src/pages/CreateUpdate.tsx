import {
    SmallTextbox,
    BigTextbox,
    DropDown,
} from '../components'
import {useEffect, useState} from "react";
import {getAllProjects} from "../util/apiCalls/project.Call.ts";
import {useAuth} from "../util/context/AuthContext.tsx";
import type {minimalProject, projectDTO, updateDTO} from "@fullstack-lab/utils";
import {createUpdate} from "../util/apiCalls/update.Calls.ts";
import {useNavigate} from "react-router-dom";

export function CreateUpdate(){
    const [projects, setProjects] = useState<minimalProject[]>();
    const {token, user} = useAuth();
    const [update, setUpdate] = useState<updateDTO>({
        title: '',
        description: '',
        project: {id: '', title: 'title', status: 'ARCHIVED'},//strip status in BE
        contributor: {id: user.id, username: user.username}
    } satisfies updateDTO)
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        // setUpdate(prevState => {
        //     return {
        //         ...prevState,
        //         title: formData.Title.toString() ?? '',
        //         description: formData.Description?.toString() ?? '',
        //         project: {
        //             ...prevState.project,
        //             id: formData.projects.toString() ?? ''
        //         },
        //     } satisfies updateDTO;
        //
        // });
        const updatedData = {
            ...update,
            title: formData.Title.toString(),
            description: formData.Description?.toString() ?? "why",
            project: {
                ...update.project,
                id: formData.projects?.toString()
            }
        } satisfies updateDTO
        console.log(updatedData);
        const result = await createUpdate(updatedData.project.id, updatedData, token);
        navigate(`/update/${result.id}`);
    }

    useEffect(() => {
        async function fetchProjects(){
            const response = await getAllProjects(token);
            setProjects(response);
        }
        fetchProjects();
    }, [token]);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SmallTextbox label={"Title"} />
                <BigTextbox label={"Description"}/>
            {/*  which project? --> dropdown  */}
                <DropDown projects={projects}/>
                <button type={"submit"} className={"button"} id={"updateCreateBtn"} >LogIn</button>
            </form>
        </>
    )
}