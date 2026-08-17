import { useNavigate} from "react-router-dom";
import { MyError } from "./MyError.ts";
import { ApiError } from "@fullstack-lab/utils";

interface ErrorProp  {
    error: MyError,
    onReset: () => void
}

export function ErrorPage({error, onReset}: ErrorProp){
    const navigate = useNavigate();
    function tryAgain() {
        onReset();
        if (!(error instanceof ApiError)) {
            navigate(error.reRoute);
        }
        else { navigate('/') }
    }
    return (
        <>
            <h1>Something went wrong!</h1>
            <p>
                Type: {error.name}<br/>
                Message: {error.message}<br/>
                Cause: {String(error.cause ?? 'Unknown')}<br/>
            </p>
            <button onClick={tryAgain}>{error.text}</button>
        </>
    )
}
