import {Link} from "react-router-dom";
import './Links.css'
export function Linki({text, to}: {text: string, to: string}){
    return (
        <>
            <Link to={to} className={"link"} replace={true}>{text}</Link>
        </>
    )
}