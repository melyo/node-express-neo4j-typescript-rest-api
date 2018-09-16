import { Express } from 'express'
import * as user from './controllers/user'

export default (app: Express) => {

    app.get('/users', user.collection)
    app.post('/users', user.create)
    app.get('/users/:id', user.item)
    app.patch('/users/:id', user.update)

}
