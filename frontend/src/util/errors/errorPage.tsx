import { useNavigate} from "react-router-dom";

interface ErrorProp  {
    error: Error,
    onReset?: () => void;
    resetErrorBoundary?: () => void;
}

export function ErrorPage({error, onReset, resetErrorBoundary}: ErrorProp){
    const navigate = useNavigate();
    function tryAgain() {
        if(onReset){
            onReset()
        }
        if(resetErrorBoundary){
            resetErrorBoundary();
        }
        navigate('/home');
    }

    return (
        <>
            <h1>Something went wrong!</h1>
            <p>
                Type: {error.name}<br/>
                Message: {error.message}<br/>
                Cause: {error.cause?.toString() ?? "Unknown"}<br/>
            </p>
            <button onClick={tryAgain}>Home</button>
        </>
    )
}
