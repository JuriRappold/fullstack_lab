import './card.css';
import {Link} from "react-router-dom";
import type {minEntity} from "../../util/formatting.ts";
export function Card({data}: {data: minEntity}){
    const hasStatus = data.status !== null;
    return (
        <>
            <Link id={data.id} className={"card"} to={`/${data.type}/${data.id}`} >
                <h3>{data.type === "user" ? "Username" : "Title"}:</h3><br/>
                <text>{data.text}</text><br/>
                {hasStatus &&
                    <label>Status: <div className={"status"}>{data.status}</div></label>
                }
            </Link>
        </>
    )
}