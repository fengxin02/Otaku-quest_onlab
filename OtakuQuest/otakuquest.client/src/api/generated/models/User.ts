/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Boss } from './Boss';
import type { Item } from './Item';
import type { TodoTask } from './TodoTask';
import type { UserItem } from './UserItem';
export type User = {
    id: number;
    username: string;
    passwordHash: string;
    level: number;
    xp: number;
    currency: number;
    maxHP: number;
    currentHP: number;
    str: number;
    int: number;
    def: number;
    avatarItemId?: number | null;
    backgroundItemId?: number | null;
    tasks: Array<TodoTask>;
    equippedWeaponId?: number | null;
    equippedWeapon?: Item;
    equippedAvatarId?: number | null;
    equippedAvatar?: Item;
    equippedBackgroundId?: number | null;
    equippedBackground?: Item;
    inventory: Array<UserItem>;
    currentBossId?: number | null;
    currentBoss?: Boss;
    currentBossHp?: number;
    lastDefeatedBossOrder: number;
    readonly totalSTR?: number;
    readonly totalINT?: number;
    readonly totalDEF?: number;
    readonly totalMaxHP?: number;
};

