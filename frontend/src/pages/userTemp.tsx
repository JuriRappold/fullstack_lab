import {Card} from "../components/ui/Card.tsx";
import type {projectDTO, userDTO} from "@fullstack-lab/utils";
import {useEffect, useState} from "react";
import {Button} from "../components/ui";
import {useParams} from "react-router-dom";
import {getProjectsByUser} from "../util/apiCalls/project.Call.ts";
import {Lists} from "../components/ui/Lists.tsx";
import type {minEntity} from "../util/formatting.ts";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiaWQiOiI2YTdmMTI5YzAzYWQ1NWE0NjJhNjY3ZDciLCJpYXQiOjE3ODcwNzE0MTQsImV4cCI6MTc4NzY3NjIxNH0.ArDXCo1Wf6mnF0AZ-Rmk846kfx_x4jK7idvzc-2Q7cY"
const user = {
    username: "bob",
    id: "6a7f129c03ad55a462a667d8"
}

export function User(){
    const [projects, setProjects] = useState<projectDTO[]>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)
    const {userId} = useParams();
    useEffect(() => {
        async function load() {
            try{
                const tmp =  await getProjectsByUser(userId, token);
                setProjects(tmp);
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, []);

    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    if(error) {
        throw new Error(error.message);
    }
    const hasProjects= !!projects;
    return (
        <>
            <Card data={{id: user.id, text: user.username, type: "user"} satisfies minEntity} />
            { hasProjects &&
                <Lists data={projects} />
            }
            <Button text={"Home"} onPush={{pathname: "/"}}/>
        </>
    )

}