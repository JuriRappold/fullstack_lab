import {
    type requestBody
} from "@fullstack-lab/utils";

const requestMethods = [
    "GET",
    "POST",
    "PATCH",
    "DELETE"
] as const
export type RequestMethod = typeof requestMethods[number];


export type RequestHeaders = {
    "Content-Type"?: "application/json" | "text/plain" | "application/x-www-form-urlencoded";
    Authorization?: `Bearer ${string}`;
    Accept?: string;
};
export type authHeader = { Authorization: `Bearer ${string}` };

export class RequestObject<T> {
    public readonly method: RequestMethod;
    public readonly headers: RequestHeaders;
    public readonly body?: string;
    public static readonly json: RequestHeaders =  {"Content-Type": "application/json"}


    constructor(method: RequestMethod, headers: RequestHeaders, body?: T) {
        this.method = method;
        this.headers = headers;
        if(body){
            this.body = JSON.stringify({data: body} satisfies requestBody<T>);
        }
    }

    static GET(isToken: boolean = false, head: RequestHeaders | string = RequestObject.json){
        if(!isToken) return new RequestObject(requestMethods[0], RequestObject.heads(head));

        else {
            if( typeof head === "string") return new RequestObject( requestMethods[0], RequestObject.defaultHeaders(head) );
            else throw new Error("Please Provide a Token");
        }
    }
    static POST<R>(body: R, isToken: boolean = false, head: RequestHeaders | string = RequestObject.json){
        if(!isToken) return new RequestObject(requestMethods[1], RequestObject.heads(head), body);

        else {
            if (typeof head === "string") return new RequestObject(requestMethods[1], RequestObject.defaultHeaders(head), body);
            else throw new Error("Please Provide a Token");
        }
    }
    static PATCH<R>(body: R, isToken: boolean = false, head: RequestHeaders | string = RequestObject.json ){
        if(!isToken) return new RequestObject(requestMethods[2], RequestObject.heads(head), body);

        else {
            if (typeof head === "string") return new RequestObject(requestMethods[2], RequestObject.defaultHeaders(head), body);
            else throw new Error("Please Provide a Token");
        }
    }
    static DELETE(isToken: boolean = false, head: RequestHeaders | string = RequestObject.json ){
        if(!isToken) return new RequestObject(requestMethods[3], RequestObject.heads(head) );

        else {
            if (typeof head === "string") return new RequestObject(requestMethods[3], RequestObject.defaultHeaders(head) );
            else throw new Error("Please Provide a Token");
        }
    }

    static heads(headers: RequestHeaders | string): RequestHeaders {
        // let head: RequestHeaders;
        if( typeof headers === "string"){
            const h: string[] = headers.split(" ");
            const o: RequestHeaders = {};
            h.forEach( el => {
                if (el.startsWith("auth")){
                    o.Authorization = `Bearer ${el.slice(4)}`;
                }
                else if (el === "content"){
                    o["Content-Type"] = "application/json"
                }
                else if(el === "plain"){
                    o["Content-Type"] = "text/plain"
                }
            })
            return o;
        }
        else return headers;
    }
    static defaultHeaders(token: string ): RequestHeaders {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    toString(){
        return JSON.stringify(this);
    }
}

