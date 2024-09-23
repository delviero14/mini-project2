import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type IAuthor = {
    id: number,
    role: string
}

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) throw "token empty!"

        const verifiedToken = verify(token, process.env.SECRET_JWT!)

        req.author = verifiedToken as IAuthor

        next()

    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

export const checkAdmin = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.author?.role !== "Admin") throw "Unauthorize"

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}