import * as jwt from 'jsonwebtoken';
import {statusCodes} from "../config/statusCodes";

export const decodeJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token) return res.status(statusCodes.UNAUTHORIZED).send({
        status: statusCodes.UNAUTHORIZED,
        message: "Missing Token"
    });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(statusCodes.BAD_REQUEST).send({
                status: statusCodes.BAD_REQUEST,
                message: "Invalid Token"
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
}