import {Card} from "../components/ui/Card.tsx";
import type {minimalUser, projectDTO, updateDTO, userDTO} from "@fullstack-lab/utils";
import {useEffect, useState} from "react";
import {Button} from "../components/ui";
import {useParams} from "react-router-dom";
import {getProjectsByUser} from "../util/apiCalls/project.Call.ts";
import {Lists} from "../components";
import {useAuth} from "../util/context/AuthContext.tsx";
import {getFullUserById} from "../util/apiCalls/user.Call.ts";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiaWQiOiI2YTdmMTI5YzAzYWQ1NWE0NjJhNjY3ZDciLCJpYXQiOjE3ODcwNzE0MTQsImV4cCI6MTc4NzY3NjIxNH0.ArDXCo1Wf6mnF0AZ-Rmk846kfx_x4jK7idvzc-2Q7cY"
// const user = {
//     username: "bob",
//     id: "6a7f129c03ad55a462a667d8"
// }

export function User(){
    const [fetchedProjects, setFetchedProjects] = useState<projectDTO[]>();
    const [fetchedUpdates, setFetchedUpdates] = useState<updateDTO[]>();
    const [fetchedUser, setFetchedUser] = useState<minimalUser>()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    const {userId} = useParams();
    const {token, user} = useAuth();
    useEffect(() => {
        async function load() {
            try{
                console.log("Parameter: " + userId);
                console.log("Auth Id: " + user.id);
                const response =  await getFullUserById(userId, token);
                setFetchedUser({id: response.id, username: response.username});
                setFetchedUpdates(response.updates);
                setFetchedProjects(response.projects);


            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [token, user.id, userId]);

    if(loading){
        return (
            <>
                <div>Loading...</div>
                <Button text={"Home"} />
            </>
        )
    }
    if(error) throw new Error(error.message);
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