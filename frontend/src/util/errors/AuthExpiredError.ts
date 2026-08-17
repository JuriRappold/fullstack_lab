export class AuthExpiredError extends Error {
    constructor( message: string = 'Session Expired'){
        super(message);
        this.name = 'AuthExpiredError';
    }
}
