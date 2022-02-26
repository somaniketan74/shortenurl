/**
 * Define all your routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Application } from 'express';
import Locals from './Locals';
import {logger} from '../middlewares/Log';


import apiRouter from './../routes/Api';

class Routes {
	public mountApi(_express: Application): Application {
		logger.info('Routes :: Mounting API Routes...');

		return _express.use(`/api`, apiRouter);
	}
}

export default new Routes();
