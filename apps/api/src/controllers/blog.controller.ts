import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export class BlogController {
    async createBlog(req: Request, res: Response){
        try {
            if (!req.file) throw "no file uploaded"
            const link = `http://localhost:8000/api/public/blog/${req?.file?.filename}`

            const { title, category, content, slug } = req.body

            const blog = await prisma.blog.create({
                data: {
                    title, category, content, slug,
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

    async getBlogs(req: Request, res: Response) {
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

    async getBlogSlug(req: Request, res: Response) {
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

    // async getDashboard(req: Request, res: Response) {
    //     try {
    //       // Dashboard logic here
    //       res.status(200).send({ status: 'ok', msg: 'Welcome to the dashboard!' });
    //     } catch (err) {
    //       res.status(400).send({ status: 'error', msg: err });
    //     }
    //   }

    async getDashboard(req: Request, res: Response) {
        try {
          const authorId = req.author?.id!; // assuming req.author is available
          const blogs = await prisma.blog.findMany({
            where: { authorId },
            include: { author: true },
            orderBy: { createdAt: 'desc' }
          });
      
          const dashboardData = {
            message: 'Welcome to the dashboard!',
            postCount: blogs.length,
            blogs: blogs.map((blog) => ({
              id: blog.id,
              title: blog.title,
              slug: blog.slug,
              category: blog.category,
              content: blog.content,
              createdAt: blog.createdAt,
              updatedAt: blog.updatedAt
            }))
          };
      
          res.status(200).send({ status: 'ok', data: dashboardData });
        } catch (err) {
          res.status(400).send({ status: 'error', msg: err });
        }
      }


}