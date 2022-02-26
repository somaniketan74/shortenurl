// @ts-ignore
import * as tinyurl from "tinyurl";
import { logger } from "../middlewares/Log";
class Utils {
    public static getErrorValitatorMsg = (oError: any) => {
        try {
            const { errors } = oError;
            const length = errors.length;
            let message: string = "";
            for (const [i, error] of errors.entries()) {
                message += error.msg
                if (length > 1 && i < length && i !== (length - 1)) {
                    message += ",\n "
                }
            }
            return message;
        } catch (err) {
            throw err;
        }
    }
    public static async getTinyUrl(url: string): Promise<string> {
        try{
            logger.info("getTinyUrl", {url});
            const result = await tinyurl.shorten(url);
            logger.info("getTinyUrl", {result});
            return result;
        }
        catch(err){
            logger.error("getTinyUrl", err);
            throw new Error(err);
        }
    }
}
export default Utils;