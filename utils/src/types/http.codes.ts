export type httpCode = Readonly<{
    status: number,
    message: string
}>

/**
 * Function checks if the statusCode is an integer
 * @param status must be an integer
 * @param message any string really
 */
export function createNewHttpCode(status: number, message: string){
    if(status%1 != 0) throw new Error('The status code must be an integer')
    return {
        status,
        message
    } satisfies httpCode
}

/*
'200': 'OK',X
'201': 'Created',X
'204': 'No Content',X
 */

export const httpOK: httpCode = {
    status: 200,
    message: 'OK'
}

export const httpCreated: httpCode = {
    status: 201,
    message: 'Created'
}

export const httpNoContent: httpCode = {
    status: 204,
    message: 'NoContent'
}

/*
'400': 'Bad Request',X
'401': 'Unauthorized',X
'403': 'Forbidden',X
'404': 'Not Found',X
'409': 'Conflict',X
 */

export const httpBadRequest: httpCode = {
    status: 400,
    message: 'Bad Request'
}

/**
 * Example: a request requires a log in
 */
export const httpUnauthorized: httpCode = {
    status: 401,
    message: 'Unauthorized'
}

/**
 * Example: user doesn't have the clearance for this route (i.e. no admin access)
 */
export const httpForbidden: httpCode = {
    status: 403,
    message: 'Forbidden'
}

export const httpNotFound: httpCode = {
    status: 404,
    message: 'Not Found'
}

/**
 * When for example two projects with the same title appear in the DB
 */
export const httpConflict: httpCode = {
    status: 409,
    message: 'Conflict'
}

/*
'500': 'Internal Server Error',X --> only really need this one
'501': 'Not Implemented',X
'503': 'Service Unavailable',X
 */

export const httpInternal: httpCode = {
    status: 500,
    message: 'Internal Server Error'
}


