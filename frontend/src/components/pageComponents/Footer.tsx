import {Linki} from "../ui";
import './footer.css';

export function Footer(){
    return (
        <>
            <footer className={"site_footer"}>
                <Linki text={"Home"} to={"/home"}/>
            </footer>
        </>
    )
}