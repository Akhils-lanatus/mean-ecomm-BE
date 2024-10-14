import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});
export const CategoryModel = mongoose.model("Category", categorySchema);