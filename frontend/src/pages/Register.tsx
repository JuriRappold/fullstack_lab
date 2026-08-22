import {useNavigate} from "react-router-dom";
import {useAuth} from "../util/context/AuthContext.tsx";
import {SmallTextbox} from "../components/ui";

export function Register(){
    const navigate = useNavigate();
    const {register} = useAuth();
    async function handleSubmit(event) {//:  React.SubmitEventHandler<HTMLButtonElement>
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const result = await register(String(data.Username), String(data.Password));
        navigate("/home");
    }
    return (
        <>
            <header className={"login"} id={"register"}>
                <div></div>
                <h1>Register</h1>
                <div></div>
            </header>
            <main className={"main safe pad"} id={"loginMain"}>
                <form onSubmit={handleSubmit}>
                    <SmallTextbox label={"Username"} isRequired={true}/>
                    <SmallTextbox label={"Password"} isRequired={true}/>
                    <button type={"submit"} className={"button"} id={"loginBtn"} >Register</button>
                </form>
                <div id={"toRegister"}>
                    <span>{"Already have an Account? Click here-->"}</span>
                    <button type={"button"} className={"button"} onClick={() => {navigate("/")}}>LogIn</button>

                </div>
            </main>
        </>
    )
}