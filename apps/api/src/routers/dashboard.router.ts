import { Router } from 'express';
import { checkAdmin, verifyToken } from "../middlewares/token";
import { Request, Response } from "express";
import DashboardController from '../controllers/dashboard.controller';

export class DashboardRouter {
    private router: Router
    private dashboardController: DashboardController

    constructor() {
        this.dashboardController = new DashboardController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', verifyToken, checkAdmin, (req: Request, res: Response) => {
            this.dashboardController.getDashboard(req, res)
        })
    }

    getRouter(): Router {
        return this.router
    }
}