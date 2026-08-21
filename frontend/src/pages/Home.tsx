import './home.css';
import type {projectDTO, updateDTO} from "@fullstack-lab/utils";
import {Card, Lists} from "../components";
import {useAuth} from "../util/context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {getProjectsByUser} from "../util/apiCalls/project.Call.ts";
import {useNavigate} from "react-router-dom";
import {getUpdatesOfUser} from "../util/apiCalls/update.Calls.ts";
const CONTRIBUTION= {
    title: "Task creation implemented",
    description: "Users can now create and edit tasks.",
    id: "6a7f129c03ad55a462a667e1",
    project: {id: "6a7f129c03ad55a462a667dc", title: "Task Manager"},
    contributor: {id: "6a7f129c03ad55a462a667d8", username: "bob"}
}

const PROJECT = {
    title: "Weather Dashboard",
    description: "A dashboard displaying current and forecasted weather data.",
    status: "DESIGN",
    id: "6a7f129c03ad55a462a667dd",
    owner: { id: "6a7f129c03ad55a462a667d7", username: "alice" },
    contributors: [
        { id: "6a7f129c03ad55a462a667d8", username: "bob" },
        { id: "6a7f129c03ad55a462a667d9", username: "charlie" }
    ]
}
export function Home(){
    const {user, token} = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [projects, setProjects] = useState<projectDTO[]>();
    const [updates, setUpdates] = useState<updateDTO[]>()

    useEffect(() => {
        async function fetchContent() {
            if(!user || !token) navigate('/');
            else{
                const projects = await getProjectsByUser(user.id, token);
                setProjects(projects);

                const updates = await getUpdatesOfUser(user.id, token);
                setUpdates(updates);
                setLoading(false);
            }
        }
        fetchContent()
    }, [navigate, token, user]);
    if(loading) {
        return (
            <>
                <h3>Loading...</h3>
            </>
        )
    }
    else if(projects && updates) {
        return(
            <>
                <div className={"home"}>
                    <aside>
                        <h4>Contributions</h4>
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

}
