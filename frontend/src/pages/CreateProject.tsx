// React
import {useAuth} from "../util/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
// Types
import type {partialProjectDTO} from "@fullstack-lab/utils";
// UI
import {BigTextbox, DropDown, SmallTextbox} from "../components";
// API Calls
import {createProject} from "../util/apiCalls/project.Call.ts";


export function CreateProject(){
    const {token, user} = useAuth();
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        if(!token || !user){
            navigate('/');
            return;
        }
        const formData = Object.fromEntries(new FormData(event.currentTarget));

        const newProject = {
            title: formData.Title.toString(),
            description: formData.Description.toString(),
            status: formData.status.toString(),
            owner: {id: user.id, username: user.username},
            contributors: []
        } satisfies partialProjectDTO;
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