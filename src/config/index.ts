import * as dotenv from 'dotenv'

dotenv.load()

export default {
    app: {
        logLevel: process.env.APP_LOG_LEVEL,
        port: process.env.APP_PORT || 7001
    },
    database: {
        connectionLimit: 100,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME
    }
}
