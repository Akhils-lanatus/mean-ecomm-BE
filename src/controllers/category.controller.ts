import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import mongoose from "mongoose";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find();
        if (!categories) throw new Error("No categories found");
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Category id is required");
        const category = await CategoryModel.findOne({ _id: req.params.id });
        if (!category) throw new Error("No category found");
        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) throw new Error("Category name is required");
        const category = await CategoryModel.create({ name });
        return res.status(201).json({ message: "Category created successfully", success: true, data: category });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name || !id) throw new Error("Category name and id is required");

        const category = await CategoryModel.findByIdAndUpdate(id, name, { new: true });
        if (!category) throw new Error("Category not found");
        return res.status(200).json({ message: "Category updated successfully", success: true, data: category });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Category id is required");
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) throw new Error("Category not found");
        return res.status(200).json({ message: "Category deleted successfully", success: true });
    } catch (error) {
        const message = errorHandler(error);
        return res.status(400).json({
            success: false,
            message,
        });
    }

};