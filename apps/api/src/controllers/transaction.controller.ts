import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
    const { name, idBlog, quantity } = req.body;

    try {
        // Fetch the blog to calculate the total amount
        const blog = await prisma.blog.findUnique({
            where: { id: idBlog },
        });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const totalAmount = blog.price * quantity;

        const transaction = await prisma.transaction.create({
            data: {
                name,
                status: "Created",
                idBlog,
                quantity,
                amount: blog.price,
                totalPaid: totalAmount,
            },
        });

        return res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating transaction" });
    }
};
