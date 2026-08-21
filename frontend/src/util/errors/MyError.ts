import {
    type responseError,
    isResponseError
} from "@fullstack-lab/utils";
export type normalError = {
    message: string,
    cause: string,
    reRoute?: string,
    name?: string,
    text?:string
}
// borrowed from utils
function isOptionalString(value: unknown): boolean {
    return value === undefined || typeof value === "string";
}

export class MyError extends Error{
    readonly text: string;
    readonly name: string;
    readonly reRoute: string;
    constructor(error: unknown){
        let normal = error;
        if(!MyError.isMyError(normal) ){
            console.log("NOT MY ERROR")
            if(isResponseError(normal)){
                console.log("RESPONSE ERROR")
                normal = MyError.convertResToMy(normal);
            }
            else if(normal instanceof Error){
                console.log("NORMAL ERROR")
                normal = MyError.convertErrToMy(normal);
            }
            else {
                normal = {
                    message: "",
                    cause: "",
                    text: "Try Again",
                    reRoute: "/"
                } satisfies normalError
            }
        }
        if(MyError.isMyError(normal)){
            super(normal.message, {cause: normal.cause});
            this.name = normal.name ?? "Error";
            this.text = normal.text ?? "Try Again";
            this.reRoute = "/" + (normal.reRoute ?? "") ;
            // console.log(this);
        }
        else throw new MyError({message: "Failed To Create Original Error", cause: "Original Error was not a valid Parameter", reRoute: "/", name: "ErrorCreationError", text:"Try Again"} satisfies normalError)
    }
    static isMyError(error: unknown): error is MyError {
        if (typeof error !== "object" || error === null || error !instanceof Error) {
            return false;
        }

        const obj = error as Record<string, unknown>;
        return (
            typeof obj.message === "string" &&
            typeof obj.cause === "string" &&
            isOptionalString(obj.reroute) &&
            isOptionalString(obj.name) &&
            isOptionalString(obj.text)
        )
    }
    static convertResToMy(err: responseError) {
        return {
            message: err.error,
            cause: err.statusCode.toString(),
            name: "ApiError",
            reRoute: '/home'
        }
    }
    static convertErrToMy(err: Error){
        return {
            message: err.message,
            cause: String(err.cause ?? "Unknown"),
            reRoute: '/home',
            text: "Try Again",
            name: err.name
        }
    }
}