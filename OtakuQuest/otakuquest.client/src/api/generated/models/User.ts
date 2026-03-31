/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TodoTask } from './TodoTask';
export type User = {
    id: number;
    username: string | null;
    passwordHash: string | null;
    level: number;
    xp: number;
    currency: number;
    maxHP: number;
    currentHP: number;
    str: number;
    int: number;
    def: number;
    avatarItemId: number | null;
    backgroundItemId: number | null;
    tasks: Array<TodoTask> | null;
};

