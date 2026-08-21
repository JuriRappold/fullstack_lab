import { miniToEntity} from "../../util/formatting.ts";
import type {projectDTO, updateDTO, userDTO} from "@fullstack-lab/utils";
import {Card} from "./Card.tsx";

type cont = {
    data: updateDTO[] | projectDTO[] | userDTO[]
}
export function Lists({data}: cont){
    const content = data.map(miniToEntity);

    return (
        <>
            <div className={"lists"}>
                {content.map( c => <Card key={c.id} data={c} /> )}
            </div>
        </>
    )
}