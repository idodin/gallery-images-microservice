import { Document, Model, model, Schema } from "mongoose";
import { IImage } from "../../interfaces/IImage";

export interface IImageModel extends IImage, Document { }

const imageSchema: Schema = new Schema({
    title: String,
    isPublic: Boolean,
    description: String,
    link: String,
    tags: [String],
    author: {type: Schema.Types.ObjectId, ref: "User"},
}, { timestamps: true });

const Image: Model<IImageModel> = model ("Image", imageSchema)

export { Image }