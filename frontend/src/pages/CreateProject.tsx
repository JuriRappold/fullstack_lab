import {useAuth} from "../util/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {projectDTO} from "@fullstack-lab/utils";
import {BigTextbox, DropDown, SmallTextbox} from "../components";
import {createProject} from "../util/apiCalls/project.Call.ts";


export function CreateProject(){
    const {token, user} = useAuth();
    const navigate = useNavigate();
    // const [project, setProject] = useState<projectDTO>();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget));

        const newProject = {
            title: formData.Title.toString(),
            description: formData.Description.toString(),
            status: formData.status.toString(),
            owner: {id: user.id, username: user.username},
            contributors: []
        } satisfies projectDTO
        const response = await createProject(token, newProject);
        navigate(`/projects/${response.id}`);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SmallTextbox label={"Title"} />
                <BigTextbox label={"Description"}/>
                {/*Status Choice - default is IDEA*/}
                <DropDown />
                <button type={"submit"} className={"button"} id={"projectCreateBtn"} >Create</button>
            </form>
        </>
    )
}