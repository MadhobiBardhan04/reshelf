import Product from "../model/Product.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get products",
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category,
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get products",
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get product",
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            subcategory,
            price,
            condition,
            description,
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required",
            });
        }

        const uploadResult = await new Promise((resolve, reject) => {

            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "reshelf/products",
                    },

                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                )

                .end(req.file.buffer);
        });

        const product = await Product.create({

            name,
            category,
            subcategory,
            price,
            condition,
            description,
            image: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create product",
        });
    }
};