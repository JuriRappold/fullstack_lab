import {
    RequestObject,
    type fetchProps,
    type fetchObj,
} from '../types';
import {projectURL} from "../constants";
import {MyError, type normalError} from "../errors";
import type {projectDTO, responseBody, responseError} from "@fullstack-lab/utils";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiaWQiOiI2YTdmMTI5YzAzYWQ1NWE0NjJhNjY3ZDciLCJpYXQiOjE3ODcwNzE0MTQsImV4cCI6MTc4NzY3NjIxNH0.ArDXCo1Wf6mnF0AZ-Rmk846kfx_x4jK7idvzc-2Q7cY"

type callProjectProps = fetchProps & {
    projectId?: string,
    userId?: string,
    requestData?: object
}

export async function useCallProject({projectId, userId, method, requestData}: callProjectProps): Promise<projectDTO | responseError> {
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

    // eslint-disable-next-line react-x/purity
    const response = await fetch(fetchObject.url, fetchObject.requestObj);

    if (response.ok) {
        const {...rest, data} = response.body as unknown as responseBody<projectDTO>;
        return data;
    }
    else {
        return response.body as unknown as responseError
    }
}