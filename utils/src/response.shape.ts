import { DTO } from './types/index.js';
import { ApiError} from "./ApiError.js";

export type responseBody<T> = {
    status: number,
    message: string
    data: T
}