import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute( {children}) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    // const navigate = useNavigate();
    if(loading){
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{
                    width: '32px', height: '32px',
                    border: '3px solid #d8d8d8',
                    borderTopColor: '#5a9e1f',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                }} />
            </div>
        )
    }

    if(!isAuthenticated){
        return (
            <Navigate
                to="/"
                replace
                state={{from: location}}
            />
        )
    }
    return children;
}
