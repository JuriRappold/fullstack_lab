// React
import {useAuth} from "../util/context/AuthContext.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
// Types
import type { responseError, updateDTO } from "@fullstack-lab/utils";
// UI
import {Button, Card, Linki} from "../components";
// API Calls
import {getUpdateById} from "../util/apiCalls/update.Calls.ts";


export function DisplayUpdate(){
    const {token} = useAuth();
    const {updateId} = useParams();
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState<updateDTO>();
    // const [updates, setUpdates] = useState<updateDTO[]>();
    const [error, setError] = useState<responseError | Error>();
    useEffect(() => {
        async function loadProjectById() {
            if(!token) return;
            try{
                console.log("Params update ID: " + updateId);
                const fetchedUpdate = await getUpdateById(updateId, token);
                setUpdate(fetchedUpdate);


            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadProjectById()
    }, [updateId, token]);
    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    else {
        if(update && !error) {
            return (
                <>
                    <div id={update.id}>
                        <h2>Update: {update.title}</h2>
                        <p>{update.description}</p>
                        <h4>Contributor:</h4>
                        <Card data={{id: update.contributor.id, text: update.contributor.username, type: "user"}} />
                        <h4>Project:</h4>
                        <Card data={{id: update.project.id, text: update.project.title, status: update.project.status ,type: "projects"}} />
                    </div>
                </>
            )
        }
        else if(error){
            console.log("UPDATE ID: " + updateId);
            throw error;
        }
        else throw new Error("Data is null", {cause: `${update}`});
    }
}