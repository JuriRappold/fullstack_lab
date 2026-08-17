import {MyError} from "./MyError.ts";

export class AuthExpiredError extends MyError {
    constructor( message: string = 'Session Expired'){
        super({message, cause: 'Token is expired/invalid', reRoute: 'login', name: 'AuthExpiredError', text: 'Log In'});
        // this.cause = 'Token is expired/invalid';
        // this.name = 'AuthExpiredError';
    }
}
