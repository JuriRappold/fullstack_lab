import { useEffect, useState } from "react";
import {ErrorPage} from "./errorPage.tsx";
import {MyError} from "./MyError.ts";



export function ErrorHandler( { children }: { children: React.ReactNode } ) {
    const [err, setErr] = useState<Error | null>(null);
    function clearError() {
        setErr(null);
    }
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            event.preventDefault();
            console.log("GLOBAL ERROR HANDLER");
            setErr(event.error instanceof Error ? event.error : new Error(event.message));
            // setError(event.error);
            // return true;
        };
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            // event.preventDefault();
            console.log("GLOBAL REJECTION HANDLER");
            setErr(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
            // setError(event.reason);
            // return true;
        };
        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        //apparently this cleans up:
        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener(
                'unhandledrejection',
                handleUnhandledRejection
            );
        };
    }, []);
    useEffect(() => {
        console.log('ErrorHandler error:', err);
    }, [err]);

    if(err) return <ErrorPage error={err} onReset={clearError} />;
    else return <>{children}</>;
}
