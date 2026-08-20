export {
    type responseBody,
    type responseError,
    isResponseError,
} from './response.shape.js';
export { type requestBody } from './request.shape.js';

export {
    httpInternal, // 500
    httpOK, //200
    httpCreated, //201
    httpNoContent, //204
    httpBadRequest, //400
    httpConflict, //409
    httpForbidden, //403
    httpNotFound, //404
    httpUnauthorized, //401
    type httpCode,

    type STATUS,
    isStatus,
    type projectDTO,
    type partialProjectDTO,
    isProjectDTO,
    isPartialProjectDTO,

    type userDTO,
    type partialUserDTO,
    isPartialUserDTO,
    isUserDTO,

    type updateDTO,
    type partialUpdateDTO,
    isUpdateDTO,
    isPartialUpdateDTO,

    type minimalUser,
    isMinimalUser,
    isMinimalUserArray,
    isOptionalMinimalUser,
    isOptionalMinimalUserArray,

    type minimalProject,
    isMinimalProject,
    isMinimalProjectArray,
    isOptionalMinimalProject,
    isOptionalMinimalProjectArray,

    type minimalUpdate,
    isMinimalUpdate,
    isMinimalUpdateArray,
    isOptionalMinimalUpdate,
    isOptionalMinimalUpdateArray,
} from './types/index.js';

export { ApiError } from './ApiError.js';

export {
    isUUID,
} from './validator.js'