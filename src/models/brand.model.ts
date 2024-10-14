import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});
export const BrandModel = mongoose.model("Brand", brandSchema);