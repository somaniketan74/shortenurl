import {logger} from '../middlewares/Log';
import Locals from '../providers/Locals';
import { Request, Response, NextFunction } from 'express';

class Handler {
	/**
	 * Handles all the not found routes
	 */
	public static notFoundHandler(_express: any): any {
		const apiPrefix = Locals.config().apiPrefix;

		_express.use('*', (req: Request, res:Response) => {
			const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

			logger.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
			return res.json({
                error: 'Page Not Found'
            });
		});

		return _express;
	}

	/**
	 * Handles your api/web routes errors/exception
	 */
	public static clientErrorHandler(err: any, req: Request, res: Response, next:NextFunction): any {
		logger.error(err.stack);

		if (req.xhr) {
			return res.status(500).send({error: 'Something went wrong!'});
		} else {
			return next(err);
		}
	}

	/**
	 * Show undermaintenance page incase of errors
	 */
	public static errorHandler(err: any, req: Request, res: Response, next:NextFunction): any {
		logger.error(err.stack);
		res.status(err.statusCode||500);
		return res.json({
            error: err
        });
	}

	/**
	 * Register your error / exception monitoring
	 * tools right here ie. before "next(err)"!
	 */
	public static logErrors(err: any, req: Request, res: Response, next:NextFunction): any {
		logger.error(err.stack);
		return next(err);
	}
}

export default Handler;
