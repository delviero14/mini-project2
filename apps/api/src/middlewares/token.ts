import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type IAuthor = {
    id: number;
    role: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw "Token is empty!";

        // Verifikasi token menggunakan SECRET_JWT
        const verifiedToken = verify(token, process.env.SECRET_JWT!);

        // Simpan hasil verifikasi di req.author
        req.author = verifiedToken as IAuthor;

        next();

    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        });
    }
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.author?.role !== "Author") throw "Unauthorized, only Admins can access this page";

        next();
    } catch (err) {
        res.status(403).send({
            status: 'error',
            msg: err
        });
    }
}
