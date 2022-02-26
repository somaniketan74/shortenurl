

import {logger} from '../middlewares/Log';

class NativeEvent {
	public cluster (_cluster: any): void {
		// Catch cluster listening event...
		_cluster.on('listening', (worker:any) =>
			logger.info(`Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`)
		);

		// Catch cluster once it is back online event...
		_cluster.on('online', (worker:any) =>
			logger.info(`Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `)
		);

		// Catch cluster disconnect event...
		_cluster.on('disconnect', (worker:any) =>
			logger.info(`Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`)
		);

		// Catch cluster exit event...
		_cluster.on('exit', (worker:any, code:any, signal:any) => {
			logger.info(`Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`);
			// Ensuring a new cluster will start if an old one dies
			_cluster.fork();
		});
	}

	public process (): void {
		// Catch the Process's uncaught-exception
		process.on('uncaughtException', (exception) =>
			logger.error(exception.stack)
		);

		// Catch the Process's warning event
		process.on('warning', (warning) =>
			logger.warn(warning.stack)
		);
	}
}

export default new NativeEvent();
