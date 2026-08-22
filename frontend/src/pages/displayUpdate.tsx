// React
import {useAuth} from "../util/context/AuthContext.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
// Types
import type { updateDTO } from "@fullstack-lab/utils";
// UI
import {Button, Card} from "../components";
// API Calls
import {getUpdateById} from "../util/apiCalls/update.Calls.ts";


export function DisplayUpdate(){
    const {token} = useAuth();
    const {updateId} = useParams();
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState<updateDTO>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function loadUpdateById() {
            // setError(null);
            if(!token){
                setError(new Error("No token Provided", {cause: 'No token'}));
                setLoading(false);
                return;
            }
            if(!updateId){
                setError(new Error("No updateId Provided", {cause: `No updateId`}));
                setLoading(false);
                return;
            }
            try{
                const fetchedUpdate = await getUpdateById(updateId, token);
                if(cancelled) return;
                setUpdate(update => {
                    if(
                        JSON.stringify(update) ===
                        JSON.stringify(fetchedUpdate)
                    ){
                        return update;
                    }
                    return fetchedUpdate;

                });


            } catch (err) {
                if(cancelled) return;
                setError(err instanceof Error ? err : new Error("Failed to load update", {cause: err}));
            } finally {
                if(!cancelled) setLoading(false);
            }
        }
        loadUpdateById();

        const intervalId = setInterval(loadUpdateById, 30_000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [updateId, token]);

    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    else if(error) throw error;
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