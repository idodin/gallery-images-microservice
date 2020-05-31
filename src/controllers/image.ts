import { Request, Response } from "express";
import { imageDBInteractions } from "../database/interactions/image";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../config/errorFormatter";
import { statusCodes } from "../config/statusCodes";
import { IImageModel } from "../database/models/image";
import { IImage } from "../interfaces/IImage";
import { Image } from "../database/models/image";

const imageController = {

    index: async (req: Request, res: Response) => {
        try {
            const { userId } = req.query;
            res.status(statusCodes.SUCCESS).send(
                userId? await imageDBInteractions.all() : await imageDBInteractions.findByUser(userId)
            );
        } catch (err) {
            res.status(statusCodes.SERVER_ERROR).send(err);
        }
    },

    show: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]); return;
        }
        try {
            const { token } = req.query;
            const imageId: string = req.params.imageId;
            const image: IImageModel = await imageDBInteractions.find(imageId);
            image ? res.status(statusCodes.SUCCESS).send(image) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Image not found" });
        } catch (error) {
            res.status(statusCodes.SERVER_ERROR).send(error);
        }
    },

    create: async (req: Request, res: Response) => {
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]); return;
        }
        try {
            let imageData: IImage = {
                ...req.body,
                link: req.file.path
            }
            let newImage: IImageModel = await imageDBInteractions.create(new Image(imageData));

            newImage = newImage.toJSON();
            res.status(statusCodes.SUCCESS).send(newImage);
        } catch (error) {
            res.status(statusCodes.SERVER_ERROR).send(error);
        }
    }
};

export { imageController };
