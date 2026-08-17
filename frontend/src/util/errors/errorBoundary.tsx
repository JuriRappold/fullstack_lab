import type {FallbackProps} from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </>
    )
}
