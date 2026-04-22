/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from './Item';
export type Boss = {
    id: number;
    name: string;
    order: number;
    description: string;
    imageAsset: string;
    maxHp: number;
    str: number;
    int: number;
    def: number;
    rewardXP: number;
    rewardCurrency: number;
    rewardItemId?: number | null;
    rewardItem?: Item;
};

