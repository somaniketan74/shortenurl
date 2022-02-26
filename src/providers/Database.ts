import mongoose from "mongoose";
import Local from "./Locals";
import bluebird from "bluebird";
import { MongoError } from 'mongodb';
import { logger } from "../middlewares/Log";
export class Database {

    public static init(): any {
        const DB_URL = Local.config().DB_URL;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        (mongoose as any).Promise = bluebird;
        mongoose.set('useCreateIndex', true);
        mongoose.connect(DB_URL, options, (error: MongoError) => {
			// handle the error case
			if (error) {
				// console.log(error);
				throw error;
			} else {
                console.log("Connected with database");
                logger.info("Connected with database");
			}
		});
    }
}
export default mongoose;