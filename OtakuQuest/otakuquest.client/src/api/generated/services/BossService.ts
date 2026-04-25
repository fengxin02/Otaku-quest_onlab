/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CombatResultDto } from '../models/CombatResultDto';
import type { CreateBossDto } from '../models/CreateBossDto';
import type { CurrentBossResponseDto } from '../models/CurrentBossResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BossService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBossCreate(
        requestBody?: CreateBossDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Boss/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CurrentBossResponseDto OK
     * @throws ApiError
     */
    public static getApiBossCurrent(): CancelablePromise<CurrentBossResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Boss/current',
        });
    }
    /**
     * @returns CombatResultDto OK
     * @throws ApiError
     */
    public static postApiBossAttack(): CancelablePromise<CombatResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Boss/attack',
        });
    }
}
