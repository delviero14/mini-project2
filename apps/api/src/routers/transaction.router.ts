import { Router, Request, Response } from 'express';
import { PrismaClient, TransactionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        // GET all transactions
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const transactions = await prisma.transaction.findMany();
                res.status(200).json(transactions);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching transactions' });
            }
        });

        // POST a new transaction
        this.router.post('/', async (req: Request, res: Response) => {
            const { name, status, idBlog, quantity, amount, voucher, totalPaid } = req.body;

            try {
                const newTransaction = await prisma.transaction.create({
                    data: {
                        name,
                        status,
                        idBlog,
                        quantity,
                        amount,
                        voucher,
                        totalPaid,
                    },
                });
                res.status(201).json(newTransaction);
            } catch (error) {
                res.status(500).json({ error: 'Error creating transaction' });
            }
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
