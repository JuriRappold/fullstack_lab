import {useEffect, useState} from "react";
import {Button} from '../components';
import {getProjectById, getProjectsByUser} from '../util/apiCalls/project.Call.ts'

import type {projectDTO, responseError} from "@fullstack-lab/utils";
const projectID = "6a7f129c03ad55a462a667df";
const userID = "6a7f129c03ad55a462a667d7";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiaWQiOiI2YTdmMTI5YzAzYWQ1NWE0NjJhNjY3ZDciLCJpYXQiOjE3ODcwNzE0MTQsImV4cCI6MTc4NzY3NjIxNH0.ArDXCo1Wf6mnF0AZ-Rmk846kfx_x4jK7idvzc-2Q7cY"
export function FetchTest(){
    // const {token} = useAuth();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<projectDTO>();
    const [error, setError] = useState<responseError | Error>();
    useEffect(() => {
        async function loadProjectById() {
            if(!token) return;
            try{
                const project = await getProjectsByUser(userID, token);
                setData(project[0]);
                console.log(project);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadProjectById()
    }, []);
    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    else {
        if(data) {
            return (
                <>
                    <div id={data.id}>
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                        <div id={data.owner.id}>Owner: {data.owner.username}</div>
                        <div>Contributors:</div>
                        <ul>
                            {data.contributors.map(c => <li key={c.id}>{c.username}</li>)}
                        </ul>
                    </div>
                    <Button text={"Home"}/>
                </>
            )
        }
        else throw new Error("Data is null", {cause: "fetching data was unsuccessful"});
    }
}