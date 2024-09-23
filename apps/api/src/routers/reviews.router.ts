import { Router, Request, Response } from 'express';
import { PrismaClient, Review } from '@prisma/client';

const prisma = new PrismaClient();

export class ReviewsRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        // GET all reviews
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const reviews = await prisma.reviews.findMany();
                res.status(200).json(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                res.status(500).json({ error: 'Error fetching reviews' });
            }
        });

        // POST a new review
        this.router.post('/', async (req: Request, res: Response) => {
            const { name, review } = req.body;

            // Ensure the review is a valid enum value
            if (!Object.values(Review).includes(review)) {
                return res.status(400).json({ error: 'Invalid review value' });
            }

            try {
                const newReview = await prisma.reviews.create({
                    data: {
                        name,
                        review,
                    },
                });
                res.status(201).json(newReview);
            } catch (error) {
                console.error('Error creating review:', error);
                res.status(500).json({ error: 'Error creating review' });
            }
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
