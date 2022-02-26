import { Application } from 'express';
class Locals {
    public static config(): any {
        const NODE_ENV= process.env.NODE_ENV || "production"
        const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/typescript_mongoose"
        const LOG_FILE = process.env.LOGFILE || "shortenurl"
        const LOG_DIR = process.env.LOGDIR || "./log"
        const APP_URL = process.env.APP_URL
        const CORS_ENABLED = process.env.CORS_ENABLED || true
        const PORT = process.env.PORT || 3000
        const APP_MAX_PARAMETER_LIMIT = process.env.APP_MAX_PARAMETER_LIMIT || 5000
        const APP_MAX_UPLOAD_LIMIT = process.env.APP_MAX_UPLOAD_LIMIT || "50mb"
        const REDIRECT_URL = process.env.REDIRECT_URL || "https://www.createintro.com/"
        return {
            DB_URL,
            LOG_FILE,
            LOG_DIR,
            NODE_ENV,
            APP_URL,
            CORS_ENABLED,
            APP_MAX_UPLOAD_LIMIT,
            APP_MAX_PARAMETER_LIMIT,
            PORT,
            REDIRECT_URL
        }
    }
    public static init (_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}
export default Locals;