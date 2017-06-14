import winston from 'winston';

export default (label) => {
    const logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                colorize: true,
                timestamp: true,
                label,
            }),
        ],
    });

    // create stream for morgan
    logger.stream = {
        write: message => logger.info(message),
    };

    return logger;
};
