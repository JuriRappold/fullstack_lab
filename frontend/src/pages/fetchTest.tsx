import {useEffect, useState} from "react";
import {Button} from '../components/ui';
import {getProjectById, getProjectsByUser} from '../util/apiCalls/project.Call.ts'

import type {projectDTO, responseError} from "@fullstack-lab/utils";
import {Card} from "../components/ui/Card.tsx";
import {useParams} from "react-router-dom";
import {miniToEntity} from "../util/formatting.ts";
const projectID = "6a7f129c03ad55a462a667df";
const userID = "6a7f129c03ad55a462a667d7";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJsaWUiLCJpZCI6IjZhN2YxMjljMDNhZDU1YTQ2MmE2NjdkOSIsImlhdCI6MTc4NzE2NTc5MSwiZXhwIjoxNzg3NzcwNTkxfQ.57psFqyyQ_OT4uVpvymAhiHp2QPKIQnOFHt7BDgUsH8"
export function FetchTest(){
    // const {token} = useAuth();
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<projectDTO>();
    const [error, setError] = useState<responseError | Error>();
    useEffect(() => {
        async function loadProjectById() {
            if(!token) return;
            try{
                const project = await getProjectById(projectId ?? projectID, token);
                if('error' in project) setError(project);
                setData(project);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadProjectById()
    }, [projectId]);
    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    else {
        if(data && !error) {
            return (
                <>
                    <div id={data.id}>
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                        <div id={data.owner.id}>Owner: {data.owner.username}</div>
                        <div>Contributors:</div>
                        {/*<ul>*/}
                        {/*    {data.contributors.map(c => <li key={c.id}>{c.username}</li>)}*/}
                        {/*</ul>*/}
                        {data.contributors.map(c => <Card data={miniToEntity(c)} key={c.id}/> )
                        }
                    </div>
                    <Button text={"Home"}/>
                </>
            )
        }
        else if(error) throw new Error(error.toString());
        else throw new Error("Data is null", {cause: `${data}`});
    }
}