import type {STATUS} from "@fullstack-lab/utils";
import {useState} from "react";
export function DropDown(){
    const [status, setStatus] = useState<STATUS>("IDEA");
    function handleChange(event) {
        setStatus(event.target.value)
    }

    return (
        <>
            <fieldset>
                <legend>Status: </legend>
                <select value={status} onChange={handleChange}>
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