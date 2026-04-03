/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuyItemDto } from '../models/BuyItemDto';
import type { CreateItemDto } from '../models/CreateItemDto';
import type { EquipItemDto } from '../models/EquipItemDto';
import type { Item } from '../models/Item';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ItemService {
    /**
     * @returns Item OK
     * @throws ApiError
     */
    public static getApiItemShop(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Item/shop',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiItemBuy(
        requestBody?: BuyItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Item/buy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiItemEquip(
        requestBody?: EquipItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Item/equip',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Item OK
     * @throws ApiError
     */
    public static getApiItemInventory(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Item/inventory',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiItemCreate(
        requestBody?: CreateItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Item/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
