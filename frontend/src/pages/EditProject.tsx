import './editiingProject.css';
// React & UI
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BigTextbox, DropDown, Linki, Lists, SmallTextbox} from "../components";
// API calls
import {getProjectById, updateProject} from "../util/apiCalls/project.Call.ts";
import {getUpdatesOfProject} from "../util/apiCalls/update.Calls.ts";
// Types
import {useAuth} from "../util/context/AuthContext.tsx";
import type {partialProjectDTO, projectDTO, STATUS, updateDTO} from "@fullstack-lab/utils";



export function EditProject(){
    const {projectId} = useParams();
    const [project, setProject] = useState<projectDTO>();
    const [updates, setUpdates] = useState<updateDTO[]>();
    const {token, user} = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchProject(){
            try {


                const response = await getProjectById(projectId, token);
                setProject(response);

                const updateRes = await getUpdatesOfProject(projectId, token);
                setUpdates(updateRes);
            } catch(e) {
                setError(e)
            } finally{
                setLoading(false);
            }
        }
        fetchProject();
    }, [projectId, token]);

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

        const formData = Object.fromEntries(new FormData(event.currentTarget));

        const updatedProject: partialProjectDTO = {}

        if(formData.Title.toString() ) updatedProject.title = formData.Title.toString();//project.title !==
        if(formData.Description.toString() ) updatedProject.description = formData.Description.toString();//project.description !==
        if(formData.status.toString()  && formData.status.toString() !== project.status ) updatedProject.status = formData.status.toString();//project.status !==

        if(Object.keys(updatedProject).length === 0){return;}
        else{
            const response = await updateProject(token, updatedProject, project.id);
            navigate(`/projects/${response.id}`);
        }

    }

    if(loading){
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }
    else if(project && updates) {
        return (
            <>
                <div className={"editingProject"}>
                    <h2>Editing: {project.title}</h2>
                    <div id={"currentProject"}>
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
                        {/*<Lists data={project.contributors}/>*/}
                        <ul>
                            {project.contributors.map(c => <li key={c.id}><Linki text={c.username} to={`/user/${c.id}`}/> </li>)}
                        </ul>
                        <h6>Updates: </h6>
                        <ul>
                            {updates.map( u => <li key={u.id}><Linki text={u.title} to={`/update/${u.id}`}/></li> )}
                        </ul>
                    </div>
                    <div id={"newProject"}>
                        <h4>Edit here:</h4>
                        <form onSubmit={handleSubmit}>
                            <SmallTextbox label={"Title"} def={project.title}/>
                            <BigTextbox label={"Description"} def={project.description} />
                            <DropDown def={project.status}/>
                            <button type={"submit"} className={"button"}>Update</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    else if(error) throw error;
    else throw new Error("Something went wrong");
}