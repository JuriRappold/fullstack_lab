import { useNavigate} from "react-router-dom";
import { MyError } from "./MyError.ts";
import { ApiError } from "@fullstack-lab/utils";

interface ErrorProp<T extends Error>  {
    error: T,
    onReset: () => void
}

export function ErrorPage({error, onReset}: ErrorProp){
    const navigate = useNavigate();
    function tryAgain() {
        onReset();
        if (MyError.isMyError(error)) {
            navigate(error.reRoute);
        }
        else { navigate('/') }
    }
    return (
        <>
            <h1>Something went wrong!</h1>
            <p>
                Type: {error.name ?? "Error"}<br/>
                Message: {error.message ?? "An Error Occurred"}<br/>
                Cause: {String(error.cause ?? 'Unknown')}<br/>
            </p>
            <button onClick={tryAgain}>{String(error.text ?? "Try Again") }</button>
        </>
    )
}
