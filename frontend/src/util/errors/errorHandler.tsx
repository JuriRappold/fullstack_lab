import { useEffect, useState } from "react";
import {ErrorPage} from "./errorPage.tsx";
import {MyError} from "./MyError.ts";



export function ErrorHandler( { children }: { children: React.ReactNode } ) {
    const [error, setError] = useState<Error | null>(null);
    function clearError() {
        setError(null);
    }
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            // event.preventDefault();
            console.log("GLOBAL ERROR HANDLER");
            setError(event.error instanceof Error ? event.error : new Error(event.message));
            // return true;
        };
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            // event.preventDefault();
            console.log("GLOBAL REJECTION HANDLER");
            setError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
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
        console.log('ErrorHandler error:', error);
    }, [error]);


    if(error) return <ErrorPage error={new MyError(error)} onReset={clearError} />;
    else return <>{children}</>;
}
