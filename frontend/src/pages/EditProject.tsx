import './editiingProject.css';
// React & UI
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BigTextbox, Button, DropDown, Linki, SmallTextbox} from "../components";
// API calls
import {
    getProjectById,
    updateProject,
    deleteProject
} from "../util/apiCalls/project.Call.ts";
import {getUpdatesOfProject} from "../util/apiCalls/update.Calls.ts";
// Types
import {useAuth} from "../util/context/AuthContext.tsx";
import type {partialProjectDTO, projectDTO, STATUS, updateDTO} from "@fullstack-lab/utils";



export function EditProject(){
    const {projectId} = useParams();
    const [project, setProject] = useState<projectDTO>();
    const [updates, setUpdates] = useState<updateDTO[]>();
    const {token} = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchProject(){
            if(!token){
                setLoading(false);
                navigate('/');
                return;
            }
            if(!projectId) {
                setError(new Error("No projectId Provided", {cause: `No projectId`}));
                setLoading(false);
                return;
            }
            try {
                const [response, updateRes] = await Promise.all([
                    getProjectById(projectId, token),
                    getUpdatesOfProject(projectId, token)
                ]);

                if(cancelled) return;
                setProject(project => {
                    if(
                        JSON.stringify(project) ===
                        JSON.stringify(response)
                    ) {
                        return project;
                    }
                    return response;
                });
                setUpdates(updates => {
                    if(
                        JSON.stringify(updates) ===
                        JSON.stringify(updateRes)
                    ) {
                        return updates;
                    }
                    return updateRes;
                });
            } catch(e) {
                if(cancelled) return;
                setError(e instanceof Error ? e : new Error("Failed to load editing page", {cause: e}));
            } finally{
                if(!cancelled) setLoading(false);
            }
        }

        fetchProject();

        const intervalId = setInterval(fetchProject, 30_000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        }
    }, [navigate, projectId, token]);

    function whichColor(status: STATUS){
        switch(status) {
            case "WIP":
                return "yellow";
            case "ARCHIVED":
                return "gray";
            case "DESIGN":
                return "darkgoldenrod";
            case "IDEA":
                return "red";
            case "FINISHED":
                return "green";
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if(!token){
            navigate('/');
            return;
        }
        const formData = Object.fromEntries(new FormData(event.currentTarget));

        const updatedProject: partialProjectDTO = {}

        if(project.title !== formData.Title.toString() ) updatedProject.title = formData.Title.toString();
        if(project.description !== formData.Description.toString() ) updatedProject.description = formData.Description.toString();
        if(formData.status.toString()  && formData.status.toString() !== project.status ) updatedProject.status = formData.status.toString();//project.status !==

        if(Object.keys(updatedProject).length === 0){return;}
        else{
            const response = await updateProject(token, updatedProject, projectId);
            navigate(`/projects/${response.id}`);
        }

    }
    async function handleDelete(){
        if(!token){
            navigate('/');
            return;
        }
        //popUp for confirmation
        if(window.confirm("Are you sure you want to delete this Project?")){
            //actually delete
            const response = await deleteProject(token, projectId);

            //Success PopUp --> navigate '/home'
            if(response) {
                const successDia = document.getElementById("deletionSuccess") as HTMLDialogElement;
                successDia.showModal();
            }
            //Failed PopUp  --> navigate '/projects/edit/:projectId'/don't navigate
            else{
                const failureDia = document.getElementById("deletionFailure") as HTMLDialogElement;
                failureDia.showModal();
            }
        }


    }

    if(loading){
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }
    else if(!error && project && updates) {
        return (
            <>
                <section className={"editingProject"}>
                    <h2>Editing: {project.title}</h2>
                    <section id={"currentProject"}>
                        <h4>Current Project: </h4>
                        <h5>Title: {project.title}</h5>
                        <p>{project.description}</p>
                        <div id={"ownerAndStatus"}>
                            <p id={project.owner.id}>Owner:
                                {<Linki text={project.owner.username} to={`/user/${project.owner.id}`} />}
                            </p>
                            <p>
                                <span>Status: </span>
                                <span style={{color: whichColor(project.status)}}>{project.status}</span>
                            </p>
                        </div>

                        <h6>Contributors:</h6>
                        <ul>
                            {project.contributors.map(c => <li key={c.id}><Linki text={c.username} to={`/user/${c.id}`}/> </li>)}
                        </ul>
                        <h6>Updates: </h6>
                        <ul>
                            {updates.map( u => <li key={u.id}><Linki text={u.title} to={`/update/${u.id}`}/></li> )}
                        </ul>
                    </section>
                    <section id={"newProject"}>
                        <h4>Edit here:</h4>
                        <form onSubmit={handleSubmit}>
                            <SmallTextbox label={"Title"} def={project.title}/>
                            <BigTextbox label={"Description"} def={project.description} />
                            <DropDown def={project.status}/>
                            <button type={"submit"} className={"button"}>Update</button>
                        </form>
                    {/* Add deletion button w/ confirmation   */}
                    </section>
                    <section id={"deleteDiv"}>
                        <h4>Or Delete the Project: </h4>
                        <button type={"button"} onClick={handleDelete} className={"button"}>Delete</button>
                    </section>

                    <dialog id={"deletionSuccess"} onClose={ (e) => { if(e.currentTarget.returnValue === 'close'){ navigate('/home') } }}>
                        <p>Successfully delete the project {project.title}</p>
                        <button type={"button"} commandfor={"deletionSuccess"} command={"close"} value={"close"} className={"button"}>Home</button>
                    </dialog>

                    <dialog id={"deletionFailure"}>
                        <p>Failed to delete the project {project.title}</p>
                        <button type={"button"} commandfor={"deletionFailure"} command={"close"} className={"button"}>Return To Editing</button>
                    </dialog>

                </section>
            </>
        )
    }
    else if(error) throw error;
    else throw new Error("Something went wrong");
}