import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { verifyToken } from "../middlewares/token";
import { uploader } from "../middlewares/uploader";

export class BlogRouter {
    private router: Router
    private blogController: BlogController

    constructor() {
        this.blogController = new BlogController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/', 
            uploader('blog-', '/blog').single('image'),
            verifyToken,
            this.blogController.createBlog
        )
        this.router.get('/', this.blogController.getBlogs)
        this.router.get('/:slug', this.blogController.getBlogSlug)
    }

    getRouter(): Router {
        return this.router
    }
}