import express, { Express, Request, Response } from 'express'
import { AuthorRouter } from './routers/author.router';
import cors from 'cors'
import path from 'path';
import { BlogRouter } from './routers/blog.router';

const PORT: number = 8000

export default class App {
    private app: Express;

    constructor() {
        this.app = express()
        this.configure()
        this.routes()
    }

    private configure(): void {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use('/api/public', 
            express.static(path.join(__dirname, "../public")))
    }

    private routes(): void{
        const authorRouter = new AuthorRouter()
        const blogRouter = new BlogRouter()

        this.app.get('/api', (req: Request, res: Response) => {
            res.send(`Hello, This is my API`)
        })

        this.app.use('/api/authors', authorRouter.getRouter())
        this.app.use('/api/blogs', blogRouter.getRouter())
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`[API] local: http://localhost:${PORT}/api`)
        })
    }
}