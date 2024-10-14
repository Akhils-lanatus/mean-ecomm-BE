import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/errorHandler.js";
import { ProductModel } from "../models/product.model.js";
const array_of_allowed_file_types = ["image/png", "image/jpeg", "image/jpg"];


export const addProductController = async (req: Request, res: Response) => {
    try {
        const { name, discount, costPrice, description, category, brand } = req.body;
        const cloudinaryImagesUrls = [];
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        if (!req.files) throw new Error("All fields are required")
        const imageUrls = files.map((file: Express.Multer.File): string => file.path);

        if (!name || !discount || !costPrice || !description || !category || !brand) {
            throw new Error("All fields are required")
        }

        files.forEach((elem) => {
            if (!array_of_allowed_file_types.includes(elem.mimetype)) {
                throw new Error("Invalid image format");
            }
        });

        for (const image in imageUrls) {
            const result = await uploadOnCloudinary(imageUrls[image]);
            if (result) {
                cloudinaryImagesUrls.push(result.url);
            }
        }

        if (cloudinaryImagesUrls.length !== imageUrls.length) {
            throw new Error("Error while adding images");
        }
        const allData = {
            name, discount, costPrice, description, category, brand,
            productImages: cloudinaryImagesUrls,
        };
        const product = await ProductModel.create(allData);
        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product,
        });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};