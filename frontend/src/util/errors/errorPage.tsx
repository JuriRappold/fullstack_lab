import { useNavigate} from "react-router-dom";

interface ErrorProp  {
    error: Error,
    onReset: () => void
}

export function ErrorPage({error, onReset}: ErrorProp){
    const navigate = useNavigate();
    function tryAgain(){
        onReset();
        navigate('/');
    }
    return (
        <>
            <h1>Something went wrong!</h1>
            <p>
                Type: {error.name}<br/>
                Message: {error.message}<br/>
                Cause: {String(error.cause ?? 'Unknown')}<br/>
            </p>
            <button onClick={tryAgain}>Try Again</button>
        </>
    )
}
