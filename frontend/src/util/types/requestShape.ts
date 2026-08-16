import {
    type requestBody
} from "@fullstack-lab/utils";

const requestMethods = [
    "GET",
    "POST",
    "PATCH",
    "DELETE"
] as const
type RequestMethod = typeof requestMethods[number];


type RequestHeaders = {
    "Content-Type"?: "application/json" | "text/plain" | "application/x-www-form-urlencoded";
    Authorization?: `Bearer ${string}`;
    Accept?: string;
};

export class RequestObject<T> {
    public readonly method: RequestMethod;
    public readonly headers: RequestHeaders;
    public readonly body?: string;
    public static readonly json: RequestHeaders =  {"Content-Type": "application/json"}


    constructor(
        method: RequestMethod,
        headers: RequestHeaders | string,
        body?: T

    ) {
        let head: RequestHeaders;
        if( typeof headers === "string"){
            head = RequestObject.heads(headers);
        }
        else head = headers;
        this.method = method;
        this.headers = head;
        if(body){
            this.body = JSON.stringify({data: body} satisfies requestBody<T>);
        }
    }

    static GET(head: RequestHeaders | string = RequestObject.json){
        return new RequestObject(requestMethods[0], head);
    }
    static POST<R>(body: R, head: RequestHeaders | string = RequestObject.json ){
        return new RequestObject<R>(requestMethods[1], head, body);
    }
    static PATCH<R>(body: R, head: RequestHeaders | string = RequestObject.json ){
        return new RequestObject<R>(requestMethods[2], head, body);
    }
    static DELETE(head: RequestHeaders | string = RequestObject.json){
        return new RequestObject(requestMethods[3], head);
    }

    static heads(headers: string){
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

    toString(){
        return JSON.stringify(this);
    }
}

