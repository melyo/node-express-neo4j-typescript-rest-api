import * as express from 'express'
import config from './config'
import exception from './lib/exception'
import logger from './lib/logger'
import middleware from './lib/middleware'
import routes from './routes'

// Init express
const app = express()

// Middleware
middleware(app)

// Rest
routes(app)

// Exception handler
exception(app)

// Run HTTP
app.listen(config.app.port, () => logger.info(`[APP] Up and running on port ${config.app.port}`))
