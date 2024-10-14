import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const multerErrorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        console.error(err.message);
        return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
    next();
};