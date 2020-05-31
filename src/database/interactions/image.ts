import {Image, IImageModel} from "../models/image";
import {IImage} from "../../interfaces/IImage";

export const imageDBInteractions = {

    all: (): Promise<IImageModel[]> => {
        return Image.find().sort({createdAt: -1}).exec();
    },

    create: (image: IImage): Promise<IImageModel> => {
        return Image.create(image);
    },

    find: (imageId: string): Promise<IImageModel> => {
        return Image.findOne({ _id: imageId }).exec();
    },

    findByUser: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ author: userId }).exec();
    },

    allA: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ $or: [{isPublic: true}, {author: userId}] }).sort({createdAt: -1}).exec();
    },

    findA: (userId: string, imageId: string): Promise<IImageModel> => {
        return Image.findOne({$or: [{isPublic: true, _id: imageId}, { author: userId, _id: imageId }]}).exec();
    },

    findByUserA: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ author: userId }).exec();
    }
};