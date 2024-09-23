import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // or use `files` for multiple files
    }
  }
}