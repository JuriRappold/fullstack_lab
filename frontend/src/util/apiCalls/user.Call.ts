// import {type fetchObj, RequestObject} from "../types";
import {userURL} from "../constants";
import {type fetchObj, RequestObject} from "../types";
import {ApiResponseError} from "../errors/ApiResponseError.ts";
import type {fullUser} from "@fullstack-lab/utils";

const getFullUserObject = (token: string, userId: string) => {
    return {
        requestObj: {
            method: "GET",
            headers: RequestObject.defaultHeaders(token)
        },
        url: `${userURL}/${userId}`
    } satisfies fetchObj
}

export async function getFullUserById(userId: string, token: string): Promise<fullUser> {
    const obj = getFullUserObject(token, userId);
    const response =  await fetch(obj.url, obj.requestObj);
    const json = await response.json();
    if(!response.ok) throw new ApiResponseError(json);
    return json.data;
}

