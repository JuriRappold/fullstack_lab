export class AuthExpiredError extends Error {
    constructor( message: string = 'Session Expired'){
        super(message);
        this.cause = 'Token is expired/invalid';
        this.name = 'AuthExpiredError';
    }
}
