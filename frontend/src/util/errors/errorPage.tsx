import { useNavigate} from "react-router-dom";
import { MyError } from "./MyError.ts";
import {useEffect, useState} from "react";
import {isResponseError} from "@fullstack-lab/utils";

interface ErrorProp<T extends Error>  {//
    error: T,
    onReset: () => void
}

export function ErrorPage({error, onReset}: ErrorProp){
    const navigate = useNavigate();
    // const [iResponseError, setIResponseError] = useState<boolean>()
    // useEffect(() => {
    //     function determineError(){
    //         if(isResponseError(error)){
    //             setIResponseError(true);
    //         }
    //         else setIResponseError(false)
    //     }
    //     determineError();
    // }, [error]);
    // console.log(isResponseError(error));
    // console.log(error);
    function tryAgain() {
        onReset();
        if (MyError.isMyError(error)) {
            navigate(error.reRoute);
        }
        else { navigate('/home') }
        // navigate('/');
    }

    // if(!iResponseError){
    //     return (
    //         <>
    //             <h1>Something went wrong! {iResponseError ? "True" : "False"}</h1>
    //             <p>
    //                 Type: {error.name ?? "Error"}<br/>
    //                 Message: {error.message ? Object.values(error.message) : "An Error Occurred"}<br/>
    //                 Cause: {String(error.cause ?? 'Unknown')}<br/>
    //             </p>
    //             <button onClick={tryAgain}>{String(error.text ?? "Try Again") }</button>
    //         </>
    //     )
    // }
    // else {
    //     return (
    //         <>
    //             <h1>Something went wrong!</h1>
    //             <p>
    //                Type: ApiError<br/>
    //                Status: {error.statusCode}
    //                Message: {error.error}
    //             </p>
    //         </>
    //     )
    // }
    // console.log(error.message);
    // if(isResponseError(error)){
    //     return (
    //         <>
    //              <h1>Something went wrong!</h1>
    //              <p>
    //                 Type: ApiError<br/>
    //                 Status: {error.statusCode}
    //                 Message: {error.error}
    //              </p>
    //         </>
    //     )
    // }
    // else {
    //     return (
    //         <>
    //             <h1>Something went wrong!</h1>
    //             <p>
    //                 Type: {error.name ?? "ErrorT"}<br/>
    //                 Message: {error.message ?? "An Error Occurred"}<br/>
    //                 Cause: {String(error.cause ?? 'Unknown')}<br/>
    //             </p>
    //             <button onClick={tryAgain}>{String(error.text ?? "Try Again") }</button>
    //         </>
    //     )
    // }
    return (
        <>
            <h1>Something went wrong!</h1>
            <p>
                Type: {error.name}<br/>
                Message: {error.message}<br/>
                Cause: {error.cause ?? "Unknown"}<br/>
            </p>
            <button onClick={tryAgain}>{String(error.text ?? "Try Again") }</button>
        </>
    )
}
