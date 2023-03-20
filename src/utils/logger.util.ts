import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const successLogOpts: DailyRotateFileTransportOptions = {
    level: "info",
    filename: "./logs/%DATE%-info.log",
    json: false,
    datePattern: "YYYY-MM-DD",
    format: format.combine(
        format.timestamp({ format: "HH-MM:ss YYYY-MM-DD" }),
        format.prettyPrint(),
        logFormat
    ),
};

const successTransport = new transports.DailyRotateFile(successLogOpts);

const errorLogOpts: DailyRotateFileTransportOptions = {
    level: "error",
    filename: "./logs/%DATE%-error.log",
    json: false,
    datePattern: "YYYY-MM-DD",
    format: format.combine(
        format.timestamp({ format: "HH-MM:ss YYYY-MM-DD" }),
        format.prettyPrint(),
        logFormat
    ),
};

const errorTransport = new transports.DailyRotateFile(errorLogOpts);

const successLogger = createLogger({
    transports: successTransport,
});

const errorLogger = createLogger({
    transports: errorTransport,
});

const info = (log: string): void => {
    successLogger.info(log);
};

const error = (log: string): void => {
    errorLogger.error(log);
};

const logger = { info, error };

export { logger };
