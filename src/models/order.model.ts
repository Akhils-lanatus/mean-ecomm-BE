import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "cancelled"],
    },
    date: {
        type: Date,
        default: Date.now,
    }
},
    {
        timestamps: true,
    });

export const OrderModel = mongoose.model("Order", OrderSchema);

