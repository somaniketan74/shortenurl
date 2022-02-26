/**
 * Defines all the requisites in HTTP
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import cors from 'cors';
import { Application } from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';

import {logger} from './Log';
import Locals from '../providers/Locals';

class Http {
	public static mount(_express: Application): Application {
		logger.info('Booting the \'HTTP\' middleware...');

		// Enables the request body parser
		_express.use(bodyParser.json({
			limit: Locals.config().APP_MAX_UPLOAD_LIMIT
		}));

		_express.use(bodyParser.urlencoded({
			limit: Locals.config().APP_MAX_UPLOAD_LIMIT,
			parameterLimit: Locals.config().APP_MAX_PARAMETER_LIMIT,
			extended: false
		}));

		// Disable the x-powered-by header in response
		_express.disable('x-powered-by');

		// Enables the CORS
		_express.use(cors());

		// Enables the "gzip" / "deflate" compression for response
		_express.use(compress());

		return _express;
	}
}

export default Http;
