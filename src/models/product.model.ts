import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot be greater than 100%'],
    },
    costPrice: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Product cost cannot be negative']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productImages: {
        type: Array(String),
        required: true,
        validate: {
            validator: function (v: [String]) {
                return v.length > 0;
            },
            message: 'At least one image must be uploaded.'
        }
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const ProductModel = mongoose.model("Product", ProductSchema);