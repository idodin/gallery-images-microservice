import { IUser } from "./IUser";

export enum Tag {
    food, travel, coffee, friends, school, sports
}

export interface IImage {
    title: string;
    isPublic: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    author: IUser;
    tags: string[];
}
