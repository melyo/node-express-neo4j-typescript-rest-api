import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { Express } from 'express'
import * as morgan from 'morgan'

export default (app: Express) => {

    app.use(cors())

    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(morgan('dev'))

}
