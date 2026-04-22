/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemType } from './ItemType';
export type CreateItemDto = {
    name: string;
    description: string;
    type: ItemType;
    price: number;
    isPurchasable: boolean;
    imageAsset: string;
    hpBonus?: number;
    strBonus?: number;
    intBonus?: number;
    defBonus?: number;
    hpMultiplier?: number;
    strMultiplier?: number;
    intMultiplier?: number;
    defMultiplier?: number;
};

