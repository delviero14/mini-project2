import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { transporter } from "../helpers/nodemailer";
import path from "path";
import fs from 'fs'
import handlebars from "handlebars"

export class AuthorController {
    async createAuthor(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body
    
        const existingUser = await prisma.user.findUnique({
          where: { email: email }
        })
    
        if (existingUser) throw "email has been used!"
    
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)
    
        const user = await prisma.user.create({
          data: { name, email, password: hashPassword }
        })
    
        // Remove the author role creation
        // const author = await prisma.author.create({
        //   data: { name, email, password: hashPassword }
        // })
    
        const payload = { id: user.id }
        const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '10m' })
    
        const templatePath = path.join(__dirname, "../templates", "verification.hbs")
        const templateSource = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateSource)
        const html = compiledTemplate({
          name: user.name,
          link: `http://localhost:3000/verify/${token}`
        })
    
        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: user.email,
          subject: 'Welcome to my BLOG',
          html: html
        })
    
        res.status(201).send({
          status: 'ok',
          msg: 'account created',
          user
        })
      } catch (err) {
        res.status(400).send({
          status: 'error',
          msg: err
        })
      }
    }

    // async createAuthor(req: Request, res: Response) {
    //     try{
    //         const { name, email, password } = req.body

    //         const existingAuthor = await prisma.author.findUnique({
    //             where: {email: email}
    //         })

    //         if(existingAuthor) throw "email has been used!"

    //         const salt = await genSalt(10)
    //         const hashPassword = await hash(password, salt)

    //         const author = await prisma.author.create({
    //             data: { name, email, password: hashPassword }
    //         })

    //         const payload = { id: author.id }
    //         const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '10m' })

    //         const templatePath = path.join(__dirname, "../templates", "verification.hbs")
    //         const templateSource = fs.readFileSync(templatePath, 'utf-8')
    //         const compiledTemplate = handlebars.compile(templateSource)
    //         const html = compiledTemplate({
    //             name: author.name,
    //             link: `http://localhost:3000/verify/${token}`
    //         })

    //         await transporter.sendMail({
    //             from: process.env.MAIL_USER,
    //             to: author.email,
    //             subject: 'Welcome to my BLOG',
    //             html: html
    //         })

    //         res.status(201).send({
    //             status: 'ok',
    //             msg: 'author created',
    //             author
    //         })
    //     }catch (err) {
    //         res.status(400).send({
    //             status: 'error',
    //             msg: err
    //         })
    //     }
    // }


    async loginAuthor(req: Request, res: Response) {
        try{
            const {email, password} = req.body

            const existingAuthor = await prisma.author.findUnique({
                where: {email: email}
            })

            if (!existingAuthor) throw "author not found"
            if (!existingAuthor.isVerify) throw "author not verify!"

            const isValidPass = await compare(password, existingAuthor.password)

            if(!isValidPass) throw "incorrect password"

            const payload = { id: existingAuthor.id, role: existingAuthor.role }
            const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' })

            res.status(200).send({
                status: 'ok',
                msg: "login success!",
                token,
                author: existingAuthor
            })

        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async editAvatar(req: Request, res: Response) {
        try {
            if (!req.file) throw "no file uploaded"
            const link = `http://localhost:8000/api/public/avatar/${req?.file?.filename}`
            
            await prisma.author.update({
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

    async verifyAuthor(req: Request, res: Response) {
        try {
            const author = await prisma.author.findUnique({
                where: { id: req.author?.id }
            })
            if(author?.isVerify) throw "invalid link"

            await prisma.author.update({
                data: { isVerify: true },
                where: { id: req.author?.id }
            })

            res.status(200).send({
                status: 'ok',
                msg: "success verify author !"
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getAuthor(req: Request, res: Response) {
        try {

            const authors = await prisma.author.findMany()
            res.status(200).send({
                status: 'ok',
                authors
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }


    async getAuthorId(req: Request, res: Response) {
        try{
            const author = await prisma.author.findUnique({ where: {id: +req.params.id} })
            if (!author) throw 'author not found!'
            res.status(200).send({
                staus: 'ok',
                author
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}