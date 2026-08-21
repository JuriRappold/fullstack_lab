import {useEffect, useState} from "react";
import {Button, Linki, Lists} from '../components/ui';
import {
    getProjectById,
    getProjectsByUser
} from '../util/apiCalls/project.Call.ts'

import type {minimalUpdate, projectDTO, responseError, updateDTO} from "@fullstack-lab/utils";
import {Link, useParams} from "react-router-dom";

import {useAuth} from "../util/context/AuthContext.tsx";
import {getUpdatesOfProject} from "../util/apiCalls/update.Calls.ts";

export function DisplayProject(){
    const {token} = useAuth();
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<projectDTO>();
    const [updates, setUpdates] = useState<updateDTO[]>();
    const [error, setError] = useState<responseError | Error>();
    useEffect(() => {
        async function loadProjectById() {
            if(!token) return;
            try{
                const fetchedProject = await getProjectById(projectId, token);
                setProject(fetchedProject);

                const fetchedUpdates = await getUpdatesOfProject(projectId, token);
                setUpdates(fetchedUpdates);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadProjectById()
    }, [projectId, token]);
    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    else {
        if(project && !error && updates) {
            return (
                <>
                    <div id={project.id}>
                        <h2>Project: {project.title}</h2>
                        <p>{project.description}</p>
                        <p id={project.owner.id}>Owner: {<Linki text={project.owner.username} to={`/user/${project.owner.id}`}></Linki>}</p><br/>
                        <h4>Contributors:</h4>
                        <Lists data={project.contributors}/>
                        <h4>Updates: </h4>
                        <Lists data={updates}/>
                    </div>
                </>
            )
        }
        else if(error) throw error;
        else throw new Error("Data is null", {cause: `${project}`});
    }
}