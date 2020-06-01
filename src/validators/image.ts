import {body, param, query, header, ValidationChain} from "express-validator/check";
import {Tag} from "../interfaces/IImage";

export function imageValidator(method: string): ValidationChain[] {
    switch (method) {
        case "GET /images": {
            return [
                query("userId", "Invalid 'userId'").optional().isMongoId(),
                header("authorization", "Missing Authorization Token").exists()
            ];
        }
        case "GET /images/:imageId": {
            return [
                param("imageId", "Invalid or missing ':imageId'").exists().isMongoId(),
                header("authorization", "Missing Authorization Token").exists()
            ];
        }
        case "POST /images": {
            return [
                header("authorization", "Missing Authorization Token").exists(),
                body("title", "Missing 'title'").exists(),
                body("title", "Invalid 'title'").isString().custom(value => value.trim().length > 0),
                body("isPublic", "Invalid or missing 'isPublic'").isBoolean().exists(),
                body("description", "Missing 'description'").exists(),
                body("description", "Invalid 'description'").isString().custom(value => value.trim().length > 0),
                body("tags", "Invalid tags in 'tags'").optional().custom(validateTags)
            ]
        }
    }
}

const validateTags = (tags: Array<string>) => {
    if (!tags) return true;
    // TODO: find a nicer way of doing this
    return ((typeof tags === "string" || tags instanceof String) && tags.toString().toLowerCase() in Tag) || (tags.every(tag => tag.toLowerCase() in Tag));
}