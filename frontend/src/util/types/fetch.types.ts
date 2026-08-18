import {type RequestMethod, RequestObject} from "./requestShape.ts";

export type fetchObj = {
    requestObj: RequestObject,
    url: string,
}

export type fetchProps = {
    method: RequestMethod,
    url: string
}

