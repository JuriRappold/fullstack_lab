import type {responseError} from "@fullstack-lab/utils";

export class ApiResponseError extends Error {
    constructor(responsErr: responseError) {
        super(responsErr.error);
        this.name = "ApiResponseError"
        this.cause = responsErr.statusCode
    }

}