import {
    projectURL
} from '../constants';
import {
    RequestObject,
    type fetchObj,
    type fetchProps
} from '../types';
import {MyError, type normalError} from "../errors";
type callProjectProps = fetchProps & {
    projectId?: string,
    userId?: string,
    requestData?: object
}
function getFetchObject({ method, token, projectId, userId, requestData}: callProjectProps): fetchObj{
    let fetchObject: fetchObj;
    switch (method){
        case "DELETE":
            fetchObject = {
                requestObj: RequestObject.DELETE(true, token),
                url: `${projectURL}/${projectId}`
            } satisfies fetchObj;
            break;
        case "PATCH":
            fetchObject = {
                requestObj: RequestObject.PATCH(requestData, true, token),
                url: `${projectURL}/${projectId}`
            }
            break;
        case "GET":
            if(userId){
                fetchObject = {
                    requestObj: RequestObject.GET(true, token),
                    url: `${projectURL}/user/${userId}`
                }
            }
            else fetchObject = {
                requestObj: RequestObject.GET(true, token),
                url: `${projectURL}/${projectId}`
            }
            break;
        case "POST":
            fetchObject = {
                requestObj: RequestObject.POST(requestData, true, token),
                url: `${projectURL}/create`
            } satisfies fetchObj
            break;
        default: throw new MyError({message: "Invalid Method", cause: method} satisfies normalError)
    }
    return fetchObject;
}

export async function getProjectById(projectId: string, toke: string){
    const obj = getFetchObject({method: "GET", token: toke, projectId});
    const response = await fetch(obj.url, obj.requestObj);
    if(!response.ok) throw new Error("Failed to fetch Project");
    const json = await response.json();
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}

export async function getProjectsByUser(userId: string, toke: string){
    const obj = getFetchObject({method: "GET", token: toke, userId});
    const response = await fetch(obj.url, obj.requestObj);
    if(!response.ok) throw new Error("Failed to fetch Project");
    const json = await response.json();
    return json.data;
}

export async function createProject(toke: string, requestData: object){
    const obj = getFetchObject({method: "POST", token: toke, requestData});
    const response = await fetch(obj.url, obj.requestObj);
    if(!response.ok) throw new Error("Failed to fetch Project");
    const json = await response.json();
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}

export async function updateProject(toke: string, requestData: object) {
    const obj = getFetchObject({method: "PATCH", token: toke, requestData});
    const response = await fetch(obj.url, obj.requestObj);
    if(!response.ok) throw new Error("Failed to fetch Project");
    const json = await response.json();
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}

export async function deleteProject(toke: string, projectId: string) {
    const obj = getFetchObject({method: "DELETE", token: toke, projectId});
    const response = await fetch(obj.url, obj.requestObj);
    if(!response.ok) throw new Error("Failed to fetch Project");
    const json = await response.json();
    if(Array.isArray(json.data)) json.data = json.data[0]
    return json.data;
}