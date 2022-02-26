import express from 'express'
const { body, validationResult, query } = require("express-validator");
import { VadidationError } from "../providers/Error";
import Utils from "../providers/Utils";
import CustomeResponse from "../providers/CustomResponse";

export default class ShortUrlValidator {

    static createShortUrl = [
        body('userId').notEmpty().withMessage("userId is mantatory").bail().isString().withMessage("userId should be a string!"),
        body('pages').notEmpty().withMessage("pages is mantatory").bail().isArray().withMessage("pages should be a array!"),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw new VadidationError(Utils.getErrorValitatorMsg(errors));
                }
                next();
            } catch (ex) {
                CustomeResponse.error(res, ex, req);
            }
        }
    ]

    static identifierValidationGet = [
        query('identifier').notEmpty().withMessage("identifier is mandatory").bail().isString().withMessage("identifier should be a string").bail(),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw new VadidationError(Utils.getErrorValitatorMsg(errors));
                }
                next();
            } catch (ex) {
                CustomeResponse.error(res, ex, req);
            }
        }
    ]
    static identifierValidationPost = [
        body('identifier').notEmpty().withMessage("identifier is mandatory").bail().isString().withMessage("identifier should be a string").bail(),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw new VadidationError(Utils.getErrorValitatorMsg(errors));
                }
                next();
            } catch (ex) {
                CustomeResponse.error(res, ex, req);
            }
        }
    ]
}