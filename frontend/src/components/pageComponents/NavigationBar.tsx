import { NaviLink} from "../ui";
import './navigation.css'
import '../ui/Links.css'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../util/context/AuthContext.tsx";

export function NavigationBar(){
    const {logout} = useAuth()
    const navigate = useNavigate();
    function handleClick(event){
        event.preventDefault(); // idk if i need this here, but as far as i can tell it doesn't hurt
        logout();
    }
    return (
        <>
            <header className={"safe header pad header"}>
                {/*<Linki text={<h1>Home</h1>} to={"/home"}/>*/}
                <Link to={"/home"} className={"link"}><h1>Home</h1></Link>
                <nav className={"nav"} aria-label={"site"}>
                    <NaviLink title={"Create Project"} to={"/projects/create"}/>
                    <NaviLink title={"Create Update"} to={"/update/create"} />
                    <NaviLink title={"Home"} to={"/home"} />
                    <Link onClick={handleClick} to={"/"} className={"link"}>LogOut</Link>
                </nav>
            </header>
        </>
    )
}