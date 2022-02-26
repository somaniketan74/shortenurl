import { Request, Response } from "express"
import Utils from "../providers/Utils";
import CustomResponse from "../providers/CustomResponse";
import Locals from "../providers/Locals";
import ShortUrlModel from "../models/ShortUrl.model";
import UrlClickModel from "../models/UrlClick.model";
import { StatusCodes } from "http-status-codes";
import { logger } from "../middlewares/Log";
import { v4 } from 'uuid';
class ShortUrl {
    public static async createShortUrl(req: Request, res: Response) {
        try {
            const body = req.body;
            const identifier = v4();
            const redirectUrl = ShortUrl.getRedirectURL(identifier);
            const shortUrl = await Utils.getTinyUrl(redirectUrl);
            const shortUrlObj = new ShortUrlModel({
                userId: body.userId,
                shortUrl,
                pages: body.pages,
                identifier
            })
            logger.info("createShortUrl", { shortUrlObj });
            await shortUrlObj.save();
            CustomResponse.success(res, { shortUrl }, StatusCodes.OK, StatusCodes.CREATED);
        }
        catch (err) {
            logger.error("createShortUrl", err);
            CustomResponse.error(res, err, req);
        }
    }
    public static async getShortUrlData(req: Request, res: Response) {
        try {
            const { identifier } = req.query;
            let result = await ShortUrlModel.findOne({ identifier }, { pages: 1 }, { lean: true });
            if (!result) result = "No pages found";
            CustomResponse.success(res, result, StatusCodes.OK, StatusCodes.CREATED);
        }
        catch (err) {
            logger.error("getShortUrlData", err);
            CustomResponse.error(res, err, req);
        }
    }
    public static async clickShortUrl(req: Request, res: Response) {
        try {
            const { identifier, data:info } = req.body;
            const update = {
                $set: {identifier},
                $push: {data: info}
            }
            logger.info("clickShortUrl", { update });
            await UrlClickModel.updateOne({identifier},update,{upsert:true});
            CustomResponse.success(res, "Success", StatusCodes.OK, StatusCodes.CREATED);
        }
        catch (err) {
            logger.error("getShortUrlData", err);
            CustomResponse.error(res, err, req);
        }
    }
    private static getRedirectURL(uid: string): string {
        let redirectUrl = Locals.config().REDIRECT_URL;
        redirectUrl += `?uid=${uid}`;
        return redirectUrl;
    }
}
export default ShortUrl;