import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VoucherRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        // GET all vouchers
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const vouchers = await prisma.voucher.findMany();
                res.status(200).json(vouchers);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching vouchers' });
            }
        });

        // POST a new voucher
        this.router.post('/', async (req: Request, res: Response) => {
            const { name, code, startDate, endDate, availableFor, discount } = req.body;

            try {
                const newVoucher = await prisma.voucher.create({
                    data: {
                        name,
                        code,
                        startDate,
                        endDate,
                        availableFor,
                        discount,
                    },
                });
                res.status(201).json(newVoucher);
            } catch (error) {
                res.status(500).json({ error: 'Error creating voucher' });
            }
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
