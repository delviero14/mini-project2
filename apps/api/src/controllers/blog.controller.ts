import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export class BlogController {
    async createBlog(req: any, res: Response){
        try {
            if (!req.file) throw "no file uploaded"
            const link = `http://localhost:8000/api/public/blog/${req?.file?.filename}`

            const { title, category, content, slug, location, price } = req.body

            const blog = await prisma.blog.create({
                data: {
                    title, category, content, price, slug , location,
                    image: link,
                    authorId: req.author?.id!
                }
            });
            res.status(201).send({
                status: 'ok',
                msg: 'Blog created !',
                blog
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getBlogs(req: any, res: Response) {
        try {
            const { search } = req.query
            let filter: Prisma.BlogWhereInput = {}

            if(search) {
                filter.title = { contains: search as string }
            }
            const blogs = await prisma.blog.findMany({
                where: filter,
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            })
            res.status(200).send({
                status: 'ok',
                blogs
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getBlogSlug(req: any, res: Response) {
        try {
            const blogs = await prisma.blog.findFirst({
                where: { slug: req.params.slug },
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            })
            res.status(200).send({
                status: 'ok',
                blogs
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}