import cors from 'cors';
import { Application } from 'express';
import {logger} from './Log';
import Locals from '../providers/Locals';

class CORS {
	public mount(_express: Application): Application {
		logger.info('Booting the \'CORS\' middleware...');

		const options = {
			origin: Locals.config().APP_URL,
			optionsSuccessStatus: 200		// Some legacy browsers choke on 204
		};

		_express.use(cors(options));

		return _express;
	}
}

export default new CORS();
