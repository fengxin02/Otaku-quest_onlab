/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerStatsDto } from '../models/PlayerStatsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayerProfileService {
    /**
     * @returns PlayerStatsDto OK
     * @throws ApiError
     */
    public static getApiPlayerProfileMyStats(): CancelablePromise<PlayerStatsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PlayerProfile/my-stats',
        });
    }
}
