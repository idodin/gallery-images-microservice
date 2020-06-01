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
            const loggedId = req['decoded']['id'];
            if (!userId) {
                res.status(statusCodes.SUCCESS).send(
                    await imageDBInteractions.all(loggedId)
                )
            } else {
                res.status(statusCodes.SUCCESS).send(
                    userId === loggedId ?
                        await imageDBInteractions.findForUser(userId) :
                        await imageDBInteractions.findByUser(userId)
                )
            }
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
            const loggedId = req['decoded']['id'];
            const imageId: string = req.params.imageId;
            const image: IImageModel = await imageDBInteractions.find(imageId);

            if (image.author != loggedId && !image.isPublic){
                res.status(statusCodes.UNAUTHORIZED).send({ status: statusCodes.UNAUTHORIZED, message: "Unauthorized access to Image"}); return;
            }
            image ? res.status(statusCodes.SUCCESS).send(image) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Image not found" });
        } catch (error) {
            res.status(statusCodes.SERVER_ERROR).send(error);
        }
    },

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]); return;
        }
        if(req.fileValidationError) {
            res.status(statusCodes.BAD_REQUEST).send( { status: statusCodes.BAD_REQUEST, message: "Only files are accepted!"});
        }
        try {
            const loggedId = req['decoded']['id'];
            let imageData: IImage = {
                ...req.body,
                link: req.file.path,
                author: loggedId
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
