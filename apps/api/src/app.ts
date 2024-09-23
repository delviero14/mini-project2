import express, { Express, Request, Response } from 'express';
import { AuthorRouter } from './routers/author.router';
import { BlogRouter } from './routers/blog.router';
import { TransactionRouter } from './routers/transaction.router';
import { VoucherRouter } from './routers/voucher.router';
import { ReviewsRouter } from './routers/reviews.router'; 
import cors from 'cors';
import path from 'path';


const PORT: number = 8000;

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.configure();
        this.routes();
    }

    private configure(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/api/public', express.static(path.join(__dirname, '../public')));
    }

    private routes(): void {
        const authorRouter = new AuthorRouter();
        const blogRouter = new BlogRouter();
        const transactionRouter = new TransactionRouter();
        const voucherRouter = new VoucherRouter();
        const reviewsRouter = new ReviewsRouter(); 
        


        this.app.get('/api', (req: Request, res: Response) => {
            res.send(`Hello, This is my API`);
        });

        this.app.use('/api/authors', authorRouter.getRouter());
        this.app.use('/api/blogs', blogRouter.getRouter());
        this.app.use('/api/transactions', transactionRouter.getRouter());
        this.app.use('/api/vouchers', voucherRouter.getRouter());
        this.app.use('/api/reviews', reviewsRouter.getRouter()); 
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`[API] local: http://localhost:${PORT}/api`);
        });
    }
}
