import { Router } from "express";
import { imageController } from "../controllers/image";
import { imageValidator } from "../validators/image";
import { uploadHandler } from "../util/uploader";
import {decodeJWT} from "../util/tokenDecoder";

const imageRouter: Router = Router();

/**
 * @swagger
 * /images/:
 *  get:
 *      description: Gets all Images
 *      parameters:
 *          -   in: query
 *              name: userId
 *              description: ID of the Users whose images to retrieve
 *              schema:
 *                  type: string
 *                  required: false
 *      tags:
 *          - Images
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Returns all Images
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
imageRouter.get("/", imageValidator("GET /images"), decodeJWT, imageController.index);

/**
 * @swagger
 * /images/{imageId}:
 *  get:
 *      description: Gets a specific Image
 *      parameters:
 *          -   in: path
 *              name: imageId
 *              description: ID of the Image to retrieve
 *              schema:
 *                  type: string
 *                  required: true
 *      tags:
 *          - Images
 *      produces:
 *          - applications/json
 *      responses:
 *          200:
 *              description: Returns specific Image
 *          404:
 *              description: Image with given ID not found
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
imageRouter.get("/:imageId", imageValidator("GET /images/:imageId"), decodeJWT, imageController.show);

imageRouter.post("/", uploadHandler.single('image'), imageValidator("POST /images"), decodeJWT,  imageController.create);
export { imageRouter };
