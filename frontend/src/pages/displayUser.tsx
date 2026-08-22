// Types
import type {minimalUser, projectDTO, updateDTO} from "@fullstack-lab/utils";
// React
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../util/context/AuthContext.tsx";
// UI
import {Lists, Button} from "../components";
// API Calls
import {getFullUserById} from "../util/apiCalls/user.Call.ts";


export function User(){
    const [fetchedProjects, setFetchedProjects] = useState<projectDTO[]>();
    const [fetchedUpdates, setFetchedUpdates] = useState<updateDTO[]>();
    const [fetchedUser, setFetchedUser] = useState<minimalUser>()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)
    const navigate = useNavigate();

    const {userId} = useParams();
    const {token, user} = useAuth();
    useEffect(() => {
        let cancelled = false;
        async function load() {
            if(!user || !token){
                setLoading(false);
                navigate('/');
                return;
            }
            if(!userId){
                setError(new Error("No userId Provided", {cause: `No userId`}));
                setLoading(false);
                return;
            }
            try{
                const response =  await getFullUserById(userId, token);
                const responseUser = {id: response.id, username: response.username};
                if(cancelled) return;
                setFetchedUser( fetchedUser => {
                    if(
                        JSON.stringify(fetchedUser) ===
                        JSON.stringify(responseUser)
                    ) {
                        return fetchedUser;
                    }
                    return responseUser;
                });
                setFetchedUpdates(fetchedUpdates => {
                    if(
                        JSON.stringify(fetchedUpdates) ===
                        JSON.stringify(response.updates)
                    ){
                        return fetchedUpdates;
                    }
                    return response.updates;
                });
                setFetchedProjects( fetchedProjects => {
                    if(
                        JSON.stringify(fetchedProjects) ===
                        JSON.stringify(response.projects)
                    ){
                        return fetchedProjects;
                    }
                    return response.projects;
                });


            } catch (e) {
                if(cancelled) return;
                setError(e instanceof Error ? e : new Error("Failed to fetch the project", {cause: e}));
            } finally {
                if(!cancelled) setLoading(false);
            }
        }
        load();

        const intervalId = setInterval(load, 30_000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        }
    }, [navigate, token, user, userId]);

    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    if(error) throw error;
    if(fetchedUser && fetchedProjects && fetchedUpdates) {
        return (
            <>
                <div id={fetchedUser.id}>
                    <h3>Username: {fetchedUser.username}</h3>
                    <h4>Projects</h4>
                    <Lists data={fetchedProjects} />
                    <h4>Updates: </h4>
                    <Lists data={fetchedUpdates} />
                </div>
            </>
        )
    }
    else throw new Error("Failed to fetch the entire User");

}