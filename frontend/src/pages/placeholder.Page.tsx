import {useAuth} from "../util/context/AuthContext.tsx";
import {AuthExpiredError} from "../util/errors/AuthExpiredError.ts";
import {
    Button,
    type ButtonHandle,
    NaviLink
} from "../components";
import {useRef} from "react";
import  '../components/Links.css';

export function Placeholder({ title }: { title: string}) {
    const { isAuthenticated, user, logout } = useAuth();
    const stupid = () => {
        // throw new Error("This Button causes an Error", {cause: "I'm stupid"})
        throw new AuthExpiredError(`Testing the AuthExpiredError`);
    };
    const buttonRef = useRef<ButtonHandle>(null);

    function handleDisable() {
        buttonRef.current?.disableButton();
    }

    function handleEnable() {
        buttonRef.current?.enableButton();
    }

    return (
    <div style={{ padding: '48px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', marginBottom: '12px', color: '#1a1a1a' }}>
        {title}
        </h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>This page is coming soon.</p>
        {isAuthenticated && (
            <div style={{ background: '#eaf3de', border: '1px solid #c0dea0', borderRadius: '8px', padding: '14px 16px', marginBottom: '16px' }}>
            <p style={{ color: '#3d6e13', fontSize: '0.9rem', marginBottom: '8px' }}>
            Logged in as <strong>{user ? user.username : "NULL"}</strong>
            </p>
            <button
            onClick={logout}
            style={{ background: 'none', border: '1px solid #3d6e13', borderRadius: '4px', color: '#3d6e13', padding: '4px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
            Log out
        </button>
        </div>
        )}
        <a href="/" style={{ color: '#3d6e13', fontWeight: 600 }}>← Back to home</a>
        <ol>
            <li><NaviLink title={"Landing Page"} /></li>
            <li><NaviLink to={{pathname: "/login"}} title={"Login"}/></li>
            <li><NaviLink title={"Register"} to={{pathname: "/register"}} /></li>
            <li><NaviLink title={"Home"} to={{pathname:"/home"}} /></li>
            {/*<li><NaviLink to={"/home"} ></NaviLink></li>*/}
            <li><NaviLink title={"Display Project"} to={{pathname: "/projects/1"}} /></li>
            <li><NaviLink title={"Create Project"} to={{pathname: "/projects/create"}} /></li>
            <li><NaviLink title={"Update Project"} to={{pathname: "/projects/update/1"}} /></li>
            <li><NaviLink title={"Create Update"} to={{pathname: "/update/create"}} /></li>
            <li><NaviLink title={"Display Update"} to={{pathname: "/update/1"}} /></li>
        </ol>

        <div style={{color: "red"}}>
            {/*<button onClick={stupid}>Cause Error</button>*/}
            {/*<BrokenComponent />*/}
            <Button ref={buttonRef} onPush={{pathname: "/projects/create"}}/> <br />
            <div>
                <p>
                    <button onClick={handleDisable}>
                        Disable
                    </button><br />
                </p>

                <p>
                    <button onClick={handleEnable}>
                        Enable
                    </button><br />
                </p>
            </div>
        </div>
    </div>
    )
}
