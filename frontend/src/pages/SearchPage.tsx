import './search.css';
import {useEffect, useState} from "react";
import {getAllProjects} from "../util/apiCalls/project.Call.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../util/context/AuthContext.tsx";
import type {minimalProject} from "@fullstack-lab/utils";
import {Lists} from "../components";

export function SearchPage() {
    const [projects, setProjects] = useState<minimalProject[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const {token} = useAuth();
    const [filteredProjects, setFilteredProjects] = useState<minimalProject[] | null>(null);


    useEffect(() => {
        let cancelled = false;
        async function fetchProjects(){
            if(!token){
                setLoading(false);
                navigate('/');
                return;
            }
            try{
                const response = await getAllProjects(token);
                if(cancelled) return;
                setProjects(projects => {
                    if(
                        JSON.stringify(projects) ===
                        JSON.stringify(response)
                    ) {
                        return projects;
                    }
                    return response;
                });
            } catch(e){
                if(cancelled) return;
                setError(e instanceof Error ? e : new Error("Failed to fetch Projects", {cause: e}));
            } finally{
                if(!cancelled) setLoading(false);
            }
        }
        fetchProjects();

        const intervalId = setInterval(fetchProjects, 30_000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        }
    }, [navigate, token]);

    function findSubstring(substring: string) {
        const tmp = projects?.filter((el) => {return el.title.includes(substring)});
        if(tmp.length === 0) setFilteredProjects(null);
        else setFilteredProjects(tmp);
    }

    function handleChange(event) {
        event.preventDefault();
        findSubstring(event.currentTarget.value);
    }

    if(loading){
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    else if(error) throw error;

    if(projects) {
        return (
            <>
                <div id={"search"}>
                    <div/>

                    <div className={"searchInputs"}>
                        <input type={"text"} placeholder={"Search Title"} onChange={handleChange}/>
                    </div>

                    <div/>
                    <div/>

                    <div className="dataResults">
                        <h3>Results</h3>
                        {/*{filteredProjects ? <Lists data={filteredProjects}/> : <h4>No Results yet...</h4>}*/}
                        <Lists data={filteredProjects ?? projects}/>
                    </div>

                    <div/>
                </div>
            </>
        )
    }
}