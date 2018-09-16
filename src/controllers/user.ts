import { NextFunction, Request, Response } from 'express'
import { failed, success } from '../lib/response'
import User from '../models/user'

export const collection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new User()
        const users = await userModel.all()
        res.json(success(users, 'Success', 200))
    } catch (error) {
        res.json(failed(null, error.message, null))
    }
}

export const item = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new User()
        const user =  await userModel.find(req.params.id)
        res.json(success(user, 'Success', 200))
    } catch (error) {
        res.json(failed(null, error.message, 500))
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new User()
        userModel.create(req.body)
        res.json(success(null, 'Success', 200))
    } catch (error) {
        res.json(failed(null, error.message, 500))
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new User()
        userModel.update(req.params.id, req.body)
        res.json(success(null, 'Success', 200))
    } catch (error) {
        res.json(failed(null, error.message, 500))
    }
}
