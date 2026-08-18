import {
    RequestObject,
    type fetchProps,
    type fetchObj,
} from '../types';
import {
    MyError,
    type normalError
} from "../errors";
import type {
    updateDTO,
    responseBody,
    responseError,
} from "@fullstack-lab/utils";
import { updateURL} from '../constants';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiaWQiOiI2YTdmMTI5YzAzYWQ1NWE0NjJhNjY3ZDciLCJpYXQiOjE3ODcwNzE0MTQsImV4cCI6MTc4NzY3NjIxNH0.ArDXCo1Wf6mnF0AZ-Rmk846kfx_x4jK7idvzc-2Q7cY";

type fetchUpdateProps = fetchProps & {
    projectId?: string,
    updateId?: string,
    userId?: string,
    requestData?: object
}

export async function useFetchUpdate({method, projectId, updateId, userId, requestData}: fetchUpdateProps): Promise<updateDTO | responseError> {
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

    // eslint-disable-next-line react-x/purity
    const response = await fetch(fetchObject.url, fetchObject.requestObj);

    if (response.ok) {
        const {...rest, data} = response.body as unknown as responseBody<updateDTO>;
        return data;
    }
    else return response.body as unknown as responseError;
}


