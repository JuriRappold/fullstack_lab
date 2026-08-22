import {Button} from "../components";
import './login.css'
import {SmallTextbox} from "../components/ui";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../util/context/AuthContext.tsx";

export function LogIn(){
    const navigate = useNavigate();
    const {logIn} = useAuth();
    async function handleSubmit(event) {//:  React.SubmitEventHandler<HTMLButtonElement>
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const result = await logIn(String(data.Username), String(data.Password));
        navigate("/home");
    }
    return (
        <>
            <header className={"login"} id={"login"}>
                <div></div>
                <h1>LogIn</h1>
                <div></div>
            </header>
            <main className={"main safe pad"} id={"loginMain"}>
                <form onSubmit={handleSubmit}>
                    <SmallTextbox label={"Username"} isRequired={true}/>
                    <SmallTextbox label={"Password"} isRequired={true}/>
                    <button type={"submit"} className={"button"} id={"loginBtn"} >LogIn</button>
                </form>
                {/*<Button text={"Register"} to={{pathname: "/register"}}/>*/}
                <div id={"toRegister"}>
                    <span>{"Don't have an Account? Click here-->"}</span>
                    <button type={"button"} className={"button"} onClick={() => {navigate("/register")}}>Register</button>
                </div>
            </main>
        </>
    )
}