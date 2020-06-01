import { IImage } from "./IImage";

export interface IUser {
    username: string;
    password: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    images: IImage[];
}
