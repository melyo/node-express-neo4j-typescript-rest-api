import * as winston from 'winston'
import config from './../config'

const level = config.app.logLevel || 'debug'

export default winston.createLogger({
    format: winston.format.json(),
    level,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
})
