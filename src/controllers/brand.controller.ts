import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler.js";
import { BrandModel } from "../models/brand.model.js";

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await BrandModel.find();
        if (!brands) throw new Error("No brands found");
        return res.status(200).json({ success: true, data: brands });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("brand id is required");
        const brand = await BrandModel.findOne({ _id: req.params.id });
        if (!brand) throw new Error("No brand found");
        return res.status(200).json({ success: true, data: brand });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
export const createBrand = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) throw new Error("Brand name is required");
        const brand = await BrandModel.create({ name });
        return res.status(201).json({ message: "Brand created successfully", success: true, data: brand });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name || !id) throw new Error("Brand name and id is required");
        const Brand = await BrandModel.findByIdAndUpdate(id, name, { new: true });
        if (!Brand) throw new Error("Brand not found");
        return res.status(200).json({ message: "Brand updated successfully", success: true, data: Brand });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Brand id is required");
        const Brand = await BrandModel.findByIdAndDelete(id);
        if (!Brand) throw new Error("Brand not found");
        return res.status(200).json({ message: "Brand deleted successfully", success: true });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }

};