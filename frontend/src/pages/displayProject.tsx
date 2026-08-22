import './project.css';
import {useEffect, useState} from "react";
import {Button, Linki, Lists} from '../components';
import {
    getProjectById,
} from '../util/apiCalls/project.Call.ts'
import {type STATUS} from "@fullstack-lab/utils";

import type { projectDTO, responseError, updateDTO} from "@fullstack-lab/utils";
import {useNavigate, useParams} from "react-router-dom";

import {useAuth} from "../util/context/AuthContext.tsx";
import {getUpdatesOfProject} from "../util/apiCalls/update.Calls.ts";

export function DisplayProject(){
    const {token} = useAuth();
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<projectDTO>({contributors: [], description: "", id: "", owner: {id: "", username: ""}, status: "IDEA", title: ""});
    const [updates, setUpdates] = useState<updateDTO[]>([]);
    const [error, setError] = useState<responseError | Error>();
    const navigate = useNavigate();

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

    useEffect(() => {
        let cancelled = false;

        async function loadProjectById() {
            try{
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
                const [fetchedProject, fetchedUpdates] = await Promise.all([
                    getProjectById(projectId, token),
                    getUpdatesOfProject(projectId, token)
                ]);
                if(cancelled) return;
                setProject( project => {
                    if(
                        JSON.stringify(project) ===
                        JSON.stringify(fetchedProject)
                    ){
                        return project;
                    }
                    return fetchedProject;
                });
                setUpdates(updates => {
                    if(
                        JSON.stringify(updates) ===
                        JSON.stringify(fetchedUpdates)
                    ) {
                        return updates;
                    }
                    return fetchedUpdates;
                });

            } catch (err) {
                if(cancelled) return;
                setError(err instanceof Error ? err : new Error("Failed to fetch the project", {cause: err}));
            } finally {
                if(!cancelled) setLoading(false);
            }
        }
        loadProjectById();

        const intervalId = setInterval(loadProjectById, 30_000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [navigate, projectId, token]);

    if(loading){
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }
    else if(error) throw error;
    else {
        if(project && !error && updates) {
            return (
                <>
                    <div id={project.id}>
                            <div className={"hero"}>
                                <h2>Project: {project.title}</h2>
                                <Button onPush={`/projects/edit/${project.id}`} text={"Edit"}/>
                                <div></div>
                            </div>
                            <p>{project.description}</p>
                        <div id={"ownerAndStatus"}>
                            <p id={project.owner.id}>Owner: {<Linki text={project.owner.username} to={`/user/${project.owner.id}`}></Linki>}</p>
                            <p>
                                <span>Status: </span>
                                <span style={{color: whichColor(project.status)}}>{project.status}</span>
                            </p>
                        </div>

                        <h4>Contributors:</h4>
                        <Lists data={project.contributors}/>
                        <h4>Updates: </h4>
                        <Lists data={updates}/>
                    </div>
                </>
            )
        }
        else throw new Error("Data is null", {cause: `${project}`});
    }
}