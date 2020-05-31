import {Image, IImageModel} from "../models/image";
import {IImage} from "../../interfaces/IImage";

export const imageDBInteractions = {

    create: (image: IImage): Promise<IImageModel> => {
        return Image.create(image);
    },

    find: (imageId: string): Promise<IImageModel> => {
        return Image.findOne({ _id: imageId }).exec();
    },

    findForUser: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ author: userId }).exec();
    },

    all: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ $or: [{isPublic: true}, {author: userId}] }).sort({createdAt: -1}).exec();
    },

    findByUser: (userId: string): Promise<IImageModel[]> => {
        return Image.find({ author: userId, isPublic: true }).exec();
    }
};