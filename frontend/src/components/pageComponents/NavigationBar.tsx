import { NaviLink} from "../ui";
import './navigation.css'
import '../ui/Links.css'
import {Link} from "react-router-dom";
import {useAuth} from "../../util/context/AuthContext.tsx";

export function NavigationBar(){
    const {logout} = useAuth()
    function handleClick(event){
        event.preventDefault();
        logout();
    }
    return (
        <>
            <header className={"safe header pad header"}>
                <Link to={"/home"} className={"link"}><h1>Home</h1></Link>
                <nav className={"nav"} aria-label={"site"}>
                    <NaviLink title={"Search for Projects"} to={"/search"} />
                    <NaviLink title={"Create Project"} to={"/projects/create"}/>
                    <NaviLink title={"Create Update"} to={"/update/create"} />
                    <NaviLink title={"Home"} to={"/home"} />
                    <Link onClick={handleClick} className={"link"} to={"/"}>LogOut</Link>
                </nav>
            </header>
        </>
    )
}