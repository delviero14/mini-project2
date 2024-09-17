import express, { Request, Response } from 'express';

// class DashboardController {
//   async getDashboard(req: Request, res: Response) {
//     if (!req.author || req.author.role !== 'Author') {
//       return res.status(401).send('Unauthorized');
//     }

//     // Return dashboard data or render dashboard page
//     return res.json({ message: 'Welcome to the dashboard!!!' });
//   }
// }

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export class DashboardController {
//   public getDashboard(req: Request, res: Response): void {
//     prisma.blog.findMany()
//       .then((blogs) => {
//         const data = {
//           message: 'Welcome to the dashboard!',
//           postCount: blogs.length,
//           blogs
//         };
//         res.json(data);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).json({ message: 'Error retrieving blog data' });
//       });
//   }
// }

// export default DashboardController;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DashboardController {
  public async getDashboard(req: Request, res: Response) {
    try {
      const blogs = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          author: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      });

      const totalCount = blogs.length;
      const data = {
        message: 'Welcome to the dashboard!',
        totalCount,
        blogs,
      };

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export default DashboardController;