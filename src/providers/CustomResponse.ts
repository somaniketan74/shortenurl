'use strict'
import { logger } from "../middlewares/Log";

class CustomeResponse {

    static async success(res: any, response: any, appStatusCode = 200, httpStatusCode = 200) {
        return res.status(httpStatusCode).send({
            code: appStatusCode,
            response
        });
    }

    static async error(res: any, error: any, req: any) {

        if (!error.userError) {
            error.message = "Internal server error! please try again";
        }

        const httpStatusCode = error && error.statusCode ? error.statusCode : 500;
        return res.status(httpStatusCode).send({
            message: (error && error.message) ? error.message : error,
            code: error.code ? error.code : httpStatusCode,
            errors: (error && error.errors && error.errors.length) ? error.errors : undefined
        });
    }
}

export default CustomeResponse;