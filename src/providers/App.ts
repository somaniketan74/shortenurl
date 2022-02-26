import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';
import { Database } from './Database';

import Locals from './Locals';
import {logger} from '../middlewares/Log';

class App {
	// Clear the console
	public clearConsole (): void {
		process.stdout.write('\x1B[2J\x1B[0f');
	}

	// Loads your dotenv file
	public loadConfiguration (): void {
		logger.info('Configuration :: Booting @ Master...');

		dotenv.config({ path: path.join(__dirname, '../../.env') });
	}

	// Loads your Server
	public loadServer (): void {
		logger.info('Server :: Booting @ Master...');

		Express.init();
	}

	// Loads the Database Pool
	public loadDatabase (): void {
		logger.info('Database :: Booting @ Master...');

		Database.init();
	}

	// Loads the Worker Cluster
	public loadWorker (): void {
		logger.info('Worker :: Booting @ Master...');
	}
}

export default new App();
