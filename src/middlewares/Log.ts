import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { getNamespace } from "continuation-local-storage";
import Locals from "../providers/Locals";
import expressWinston from "express-winston";
const { LOG_DIR, LOG_FILE } = Locals.config();

const winstonLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    ),
    transports: [
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD-HH',
            filename: `${LOG_DIR}/${LOG_FILE}.log`
        })
    ],
    exitOnError: false
});

// Wrap Winston logger to print reqId in each log
const formatMessage = (message: string) => {
    const myRequest = getNamespace('myrequest');
    message = myRequest && myRequest.get('reqId') ? `${myRequest.get('reqId')}:${message}` : message;
    return message;
};

const getJsonObj = (message: string, data?: any) => {
    return {
        message: formatMessage(message),
        data
    }
}
const createJsonObj = (obj: any) => {
    if (obj instanceof Error) {
        obj = {
            message: (obj && obj.message) ? obj.message : "",
            stack: (obj && obj.stack) ? obj.stack : "",
            name: (obj && obj.name) ? obj.name : ""
        }
    }
    return {
        data: obj?obj:{}
    }
}
export const logger = {
    log: (level: string, message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log(level, JSON.stringify(response));
    },
    error: (message: string, data?: any) => {
        winstonLogger.log('error', formatMessage(message), createJsonObj(data));
    },
    warn: (message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log('warn', JSON.stringify(response));
    },
    verbose: (message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log('info', JSON.stringify(response));
    },
    info: (message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log('info', formatMessage(message), createJsonObj(data));
    },
    debug: (message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log('debug', JSON.stringify(response));
    },
    silly: (message: string, data?: any) => {
        const response = getJsonObj(message, data);
        winstonLogger.log('silly', JSON.stringify(response));
    },
    profile: (message: string, data?: any) => {
        winstonLogger.profile("Performance " + message, data);
    },
    performanceStart: (str: string) => performance("PERFORMANCE_START", str),
    performanceEnd: (str: string) => performance("PERFORMANCE_END", str)
};

function performance(level: string, str: string) {
    if (level === "PERFORMANCE_START") {
        console.time(str);
    } else {
        console.timeEnd(str);
    };
};

export const expWin = expressWinston.logger({
    transports: [
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD-HH',
            filename: `${LOG_DIR}/access.log`
        }),
    ],
    format: format.combine(
        format.json()
    ),
    responseWhitelist: ['body', 'statusCode']
})
export const expErrWin = expressWinston.errorLogger({
    transports: [
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD-HH',
            filename: `${LOG_DIR}/access.log`
        }),
    ],
    format: format.combine(
        format.json()
    )
})