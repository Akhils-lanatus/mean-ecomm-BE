import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

