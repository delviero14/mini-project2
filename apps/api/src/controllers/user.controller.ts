import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { transporter } from "../helpers/nodemailer";
import path from "path";
import fs from 'fs'
import handlebars from "handlebars"

export class UserController {

    async createUser(req: Request, res: Response) {
        try {
          const { name, email, password } = req.body;
    
          const existingUser = await prisma.user.findUnique({
            where: { email: email }
          });
    
          if (existingUser) throw "email has been used!";
    
          const salt = await genSalt(10);
          const hashPassword = await hash(password, salt);
    
          const user = await prisma.user.create({
            data: { name, email, password: hashPassword }
          });
    
          const payload = { id: user.id };
          const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '10m' });
    
          const templatePath = path.join(__dirname, "../templates", "verification.hbs");
          const templateSource = fs.readFileSync(templatePath, 'utf-8');
          const compiledTemplate = handlebars.compile(templateSource);
          const html = compiledTemplate({
            name: user.name,
            link: `http://localhost:3000/verify/${token}`
          });
    
          await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Welcome to my BLOG',
            html: html
          });
    
          res.status(201).send({
            status: 'ok',
            msg: 'user created',
            user
          });
        } catch (err) {
          res.status(400).send({
            status: 'error',
            msg: err
          });
        }
      }



    async getUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: "Gagal mengambil data pengguna" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const existingUser = await prisma.user.findUnique({
                where: { email: email }
            })

            if (!existingUser) throw "user not found"
            if (!existingUser.isVerify) throw "user not verify!"

            const isValidPass = await compare(password, existingUser.password)

            if (!isValidPass) throw "incorrect password"

            const payload = { id: existingUser.id, role: existingUser.role }
            const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' })

            res.status(200).send({
                status: 'ok',
                msg: "login success!",
                token,
                user: existingUser
            })

        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getUserId(req: Request, res: Response) {
        try {
          const user = await prisma.user.findUnique({ where: { id: +req.params.id } });
          if (!user) throw 'user not found!';
          res.status(200).send({
            status: 'ok',
            user
          });
        } catch (err) {
          res.status(400).send({
            status: 'error',
            msg: err
          });
        }
      }

    async editAvatar(req: Request, res: Response) {
        try {
            if (!req.file) throw "no file uploaded"
            const link = `http://localhost:8000/api/public/avatar/${req?.file?.filename}`
            
            await prisma.user.update({
                data: {avatar: link},
                where: {id: req.author?.id}
            })
            res.status(200).send({
                status: 'ok',
                msg: 'edit avatar success!'
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })     
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
          const user = await prisma.user.findUnique({
            where: { id: req.author?.id }
          });
          if (user?.isVerify) throw "invalid link";
    
          await prisma.user.update({
            data: { isVerify: true },
            where: { id: req.author?.id }
          });
    
          res.status(200).send({
            status: 'ok',
            msg: "success verify user !"
          });
        } catch (err) {
          res.status(400).send({
            status: 'error',
            msg: err
          });
        }
      }

}
