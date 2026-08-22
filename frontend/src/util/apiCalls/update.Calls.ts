import {
    updateURL,
} from '../constants';
import {
    RequestObject,
    type fetchObj,
    type fetchProps
} from '../types';
import {MyError, type normalError} from "../errors";
import type {updateDTO} from "@fullstack-lab/utils";
import {ApiResponseError} from "../errors/ApiResponseError.ts";

type updateProps = fetchProps & {
    updateId?: string,
    userId?: string,
    requestData?: object,
    projectId?: string
}

function getFetchObject({ method, token, updateId, userId, requestData, projectId}: updateProps): fetchObj{
    let fetchObject: fetchObj;
    switch (method){
        // case "DELETE":
        //     fetchObject = {
        //         requestObj: RequestObject.DELETE(true, token),
        //         url: `${updateURL}/${updateId}`
        //     } satisfies fetchObj;
        //     break;
        // case "PATCH":
        //     fetchObject = {
        //         requestObj: RequestObject.PATCH(requestData, true, token),
        //         url: `${updateURL}/${updateId}`
        //     }
        //     break;
        case "GET":
            if(projectId){
                fetchObject = {
                    requestObj: RequestObject.GET(true, token),
                    url: `${updateURL}/project/${projectId}`
                }
            }
            else if (updateId) {
                fetchObject = {
                    requestObj: RequestObject.GET(true, token),
                    url: `${updateURL}/update/${updateId}`
                }
            }
            else {
                fetchObject = {
                    requestObj: RequestObject.GET(true, token),
                    url: userId ? `${updateURL}/user/${userId}` : `${updateURL}/user/`
                }
            }
            break;
        case "POST":
            fetchObject = {
                requestObj: RequestObject.POST(requestData, true, token),
                url: `${updateURL}/create`
            } satisfies fetchObj
            break;
        default: throw new MyError({message: "Invalid Method", cause: method} satisfies normalError)
    }
    return fetchObject;
}

export async function createUpdate(projectId: string, requestData: object, token: string): Promise<updateDTO>{
    const obj = getFetchObject({method: "POST", token, projectId, requestData});
    const response = await fetch(obj.url, obj.requestObj);
    const json = await response.json();
    if(!response.ok) throw new ApiResponseError(json);
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}

export async function getUpdatesOfProject(projectId: string, token: string): Promise<updateDTO[]>{
    const obj = getFetchObject({method: "GET", token, projectId});
    const response = await fetch(obj.url, obj.requestObj);
    const json = await response.json();
    if(!response.ok) throw new ApiResponseError(json);
    return json.data;
}

export async function getUpdatesOfUser(userId: string, token: string){
    const obj = getFetchObject({method: "GET", token, userId});
    const response = await fetch(obj.url, obj.requestObj);
    const json = await response.json();
    if(!response.ok) throw new ApiResponseError(json);
    return json.data;
}

export async function getUpdateById(updateId: string, token: string): Promise<updateDTO>{
    const obj = getFetchObject({method: "GET", token, updateId});
    const response = await fetch(obj.url, obj.requestObj);
    const json = await response.json();
    if(!response.ok) throw new ApiResponseError(json);
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}
