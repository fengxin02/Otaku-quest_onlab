/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TodoService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiTodo(
        requestBody?: CreateTaskDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Todo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiTodo(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Todo',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static postApiTodoComplete(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Todo/{id}/complete',
            path: {
                'id': id,
            },
        });
    }
}
