import {body, param, query, ValidationChain} from "express-validator/check";
import {Tag} from "../interfaces/IImage";

export function imageValidator(method: string): ValidationChain[] {
    switch (method) {
        case "GET /images": {
            return [
                query("userId", "Invalid 'userId'").optional().isMongoId()
            ];
        }
        case "GET /images/:imageId": {
            return [
                param("imageId", "Invalid or missing ':imageId'").exists().isMongoId(),
                query("token", "Missing 'token'").exists()
            ];
        }
        case "POST /images": {
            return [
                body("title", "Invalid or missing 'title'").isString().exists(),
                body("isPublic", "Invalid or missing 'isPublic'").isBoolean().exists(),
                body("description", "Invalid or missing 'description'").isString().exists(),
                body("tags", "Invalid tags in 'tags'").optional().custom(validateTags)
            ]
        }
    }
}

const validateTags = (tags: Array<string>) => {
    return tags.every(tag => tag.toLowerCase() in Tag)
}