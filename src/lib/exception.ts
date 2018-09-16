import { Express } from 'express'
import { failed } from './response'

export default (app: Express) => {

    app.use((err, req, res, next) => {
        if (!err.httpCode) {
            err.httpCode = 500
        }
        const body = failed(err.body, err.message, err.httpCode)
        res.status(err.httpCode).json(body)
    })

    app.use((req, res, next) => {
        const body = failed(null, 'Not Found', 404)
        res.status(404).json(body)
    })

}
