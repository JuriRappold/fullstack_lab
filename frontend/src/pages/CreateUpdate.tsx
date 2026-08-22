import {
    SmallTextbox,
    BigTextbox,
    DropDown,
} from '../components'
import {useEffect, useState} from "react";
import {getAllProjects} from "../util/apiCalls/project.Call.ts";
import {useAuth} from "../util/context/AuthContext.tsx";
import type {minimalProject, partialUpdateDTO} from "@fullstack-lab/utils";
import {createUpdate} from "../util/apiCalls/update.Calls.ts";
import {useNavigate} from "react-router-dom";

export function CreateUpdate(){
    const [projects, setProjects] = useState<minimalProject[]>();
    const {token, user} = useAuth();
    const [update, setUpdate] = useState<partialUpdateDTO>({ contributor: {id: user.id, username: user.username} })
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function handleSubmit(event){
        event.preventDefault();
        if(!token){
            navigate('/');
            return;
        }
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        const updatedData = {
            ...update,
            title: formData.Title.toString(),
            description: formData.Description?.toString(),
            project: {
                id: formData.projects?.toString()
            }
        } satisfies partialUpdateDTO
        const result = await createUpdate(updatedData.project.id, updatedData, token);
        navigate(`/update/${result.id}`);
    }

    useEffect(() => {
        let cancelled = false;
        async function fetchProjects(){
            if(!user || !token){
                setLoading(false);
                navigate('/');
                return;
            }
            try{
                const response = await getAllProjects(token);
                if(cancelled) return;
                setProjects(projects => {
                    if(
                        JSON.stringify(projects) ===
                        JSON.stringify(response)
                    ) {
                        return projects;
                    }
                    return response;
                });
            } catch(e){
                if(cancelled) return;
                setError(e instanceof Error ? e : new Error("Failed to fetch projects", {cause: e}));
            } finally{
                if(!cancelled) setLoading(false);
            }
        }
        fetchProjects();

        const intervalId = setInterval(fetchProjects, 30_000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        }
    }, [navigate, token, user]);

    if(loading){
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    else if(error) throw error;

    else{
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <SmallTextbox label={"Title"} />
                    <BigTextbox label={"Description"}/>
                    {/*  which project? --> dropdown  */}
                    <DropDown projects={projects}/>
                    <button type={"submit"} className={"button"} id={"updateCreateBtn"} >Create</button>
                </form>
            </>
        )
    }
}