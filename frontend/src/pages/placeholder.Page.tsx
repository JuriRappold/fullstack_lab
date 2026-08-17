import {useAuth} from "../util/context/AuthContext.tsx";
import {NavLink} from "react-router-dom";
// import {BrokenComponent} from "./BrokenComponent.tsx";
import {AuthExpiredError} from "../util/errors/AuthExpiredError.ts";

export function Placeholder({ title }: { title: string}) {
    const { isAuthenticated, user, logout } = useAuth();
    const stupid = () => {
        // throw new Error("This Button causes an Error", {cause: "I'm stupid"})
        throw new AuthExpiredError(`Testing the AuthExpiredError`);
    };
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
        <li><NavLink to="/">Landing Page</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/projects/1">Project Display</NavLink></li>
        <li><NavLink to="/projects/create">Create Project</NavLink></li>
        <li><NavLink to="/projects/update/1">Edit Project</NavLink></li>
        <li><NavLink to="/update/create">Create Update</NavLink></li>
        <li><NavLink to="/update/1">Update Display</NavLink></li>
        </ol>

        <div style={{color: "red"}}>
            <button onClick={stupid}>Cause Error</button>
            {/*<BrokenComponent />*/}
        </div>
    </div>
    )
}
