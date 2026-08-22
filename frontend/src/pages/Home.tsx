import './home.css';
// Types
import type {projectDTO, updateDTO} from "@fullstack-lab/utils";
// Components
import {Lists} from "../components";
// React
import {useAuth} from "../util/context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// API Calls
import {getProjectsByUser} from "../util/apiCalls/project.Call.ts";
import {getUpdatesOfUser} from "../util/apiCalls/update.Calls.ts";


// const CONTRIBUTION= {
//     title: "Task creation implemented",
//     description: "Users can now create and edit tasks.",
//     id: "6a7f129c03ad55a462a667e1",
//     project: {id: "6a7f129c03ad55a462a667dc", title: "Task Manager"},
//     contributor: {id: "6a7f129c03ad55a462a667d8", username: "bob"}
// }
// const PROJECT = {
//     title: "Weather Dashboard",
//     description: "A dashboard displaying current and forecasted weather data.",
//     status: "DESIGN",
//     id: "6a7f129c03ad55a462a667dd",
//     owner: { id: "6a7f129c03ad55a462a667d7", username: "alice" },
//     contributors: [
//         { id: "6a7f129c03ad55a462a667d8", username: "bob" },
//         { id: "6a7f129c03ad55a462a667d9", username: "charlie" }
//     ]
// }

export function Home(){
    const {user, token} = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    const [projects, setProjects] = useState<projectDTO[]>();
    const [updates, setUpdates] = useState<updateDTO[]>()

    useEffect(() => {
        // Supposedly prevents the setting of stale results setting projects/updates
        let cancelled = false;

        async function fetchContent() {
            if(!user || !token){
                setLoading(false);
                navigate('/');
                return;
            }
            else{
                try {
                    const [fetchedProjects, fetchedUpdates] = await Promise.all([
                        getProjectsByUser(user.id, token),
                        getUpdatesOfUser(user.id, token)
                    ]);

                    if(cancelled) return;
                    setProjects(projects => {
                        if(
                            JSON.stringify(projects) ===
                            JSON.stringify(fetchedProjects)
                        ) {
                            return projects;
                        }
                        return fetchedProjects;
                    });
                    setUpdates(updates => {
                        if(
                            JSON.stringify(updates) ===
                            JSON.stringify(fetchedUpdates)
                        ) {
                            return updates;
                        }
                        return fetchedUpdates;
                    });
                } catch(e){
                    if(cancelled) return;
                    setError(e instanceof Error ? e : new Error("Failed to load Home Page", {cause: e}));
                } finally{
                    if(!cancelled) setLoading(false);
                }
            }
        }
        fetchContent();


        const intervalId = setInterval(fetchContent, 30_000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [navigate, token, user]);


    if(loading) {
        return (
            <>
                <h3>Loading...</h3>
            </>
        )
    }
    else if(!error && projects && updates) {
        return(
            <>
                <div className={"home"}>
                    <aside>
                        <h2>Contributions</h2>
                        <Lists data={updates} />
                    </aside>
                    <main>
                        <h2>Projects</h2>
                        <Lists data={projects} />
                    </main>
                </div>
            </>
        )
    }
    else throw error;

}
