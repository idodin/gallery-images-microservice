import { IImage } from "./IImage";

export enum Role {
    user, admin
}

export interface IUser {
    username: string;
    password: string;
    email: string;
    role: string[];
    createdAt: string;
    updatedAt: string;
    images: IImage[];
}
