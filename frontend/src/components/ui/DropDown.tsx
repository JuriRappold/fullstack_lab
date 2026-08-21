import type {minimalProject, STATUS} from "@fullstack-lab/utils";
import {useState} from "react";
export function DropDown({projects}: {projects?: minimalProject[]}){
    const [status, setStatus] = useState<STATUS>("IDEA");
    const [project, setProject] = useState<string>();
    function handleChange(event) {
        setStatus(event.target.value)
    }
    function handleProject(event) {
        setProject(event.target.value);
    }

    if(projects){
        console.log(projects);
        return (
            <>
                <fieldset>
                    <legend>Which Project?</legend>
                    <select value={project} onChange={handleProject} name={"projects"}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                </fieldset>
            </>
        )
    }
    else {
        return (
            <>
                <fieldset>
                    <legend>Status:</legend>
                    <select value={status} onChange={handleChange} name={"status"}>
                        <option value={"IDEA"}>-- Choose a Status --</option>
                        <option value={"IDEA"}>IDEA</option>
                        <option value={"DESIGN"}>DESIGN</option>
                        <option value={"WIP"}>WIP</option>
                        <option value={"FINISHED"}>FINISHED</option>
                        <option value={"ARCHIVED"}>ARCHIVED</option>
                    </select>
                </fieldset>
            </>
        )
    }
}