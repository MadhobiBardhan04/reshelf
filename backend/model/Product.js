import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        condition: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        subcategory: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

       images: [
    {
        url: {
            type: String,
            required: true,
        },
        cloudinaryPublicId: {
            type: String,
            default: "",
        },
    },
],
        cloudinaryPublicId: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;