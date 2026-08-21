import {
    userURL
} from "../constants";
import {
    type full_user,
    RequestObject
} from "../types";
import {
    type responseBody,
    type responseError,
    type userDTO,
    isResponseError
} from '@fullstack-lab/utils';
import {MyError} from "../errors";


async function getData(res: Response): Promise<full_user>{
    const json: responseBody<full_user> | responseError = await res.json(); //
    if (isResponseError(json)) {
        // if (!res.ok) throw new MyError({
        //     message: `${json.statusCode}:${json.error}`,
        //     cause: json.statusCode.toString(),
        //     name:'ApiError'
        // } satisfies normalError
        // );
        // else throw new MyError(json);
        throw new MyError(json);
    }
    else return json.data;
}


export async function logInRequest(username: string, password: string): Promise<full_user> {
    const req: RequestObject<userDTO> = RequestObject.POST({username, password});
    const res: Response = await fetch(`${userURL}/login`, req);

    return getData(res);
}

export async function registerRequest(username: string, password: string): Promise<full_user>{
    const req: RequestObject<userDTO> = RequestObject.POST({username, password});
    const res: Response = await fetch(`${userURL}/register`, req);

    return getData(res);
}

export async function getMe(token: string): Promise<userDTO> {
    const req = RequestObject.GET(true, token);
    const res: Response = await fetch(`${userURL}/me`, req);
    return getData(res);
}

