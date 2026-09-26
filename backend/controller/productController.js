import Product from "../model/Product.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "available",
    }).sort({ createdAt: -1 });

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
      status: "available",
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
    console.log("CREATE PRODUCT STARTED");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? req.file.originalname : "NO FILE");
    console.log("USER:", req.user);
    const { name, category, subcategory, price, condition, description } =
      req.body;

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
          },
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
      seller: req.user.id,
    });
    console.log("PRODUCT SAVED:", product);
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
// Get products added by the logged-in seller
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get your products",
    });
  }
};

// Update a product owned by the logged-in seller
export const updateProduct = async (req, res) => {
  try {
    const { name, category, subcategory, price, condition, description } =
      req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not the owner",
      });
    }

    // Update only the fields provided
    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (subcategory !== undefined) product.subcategory = subcategory;
    if (price !== undefined) product.price = price;
    if (condition !== undefined) product.condition = condition;
    if (description !== undefined) product.description = description;

    // Replace image only if a new image was uploaded
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "reshelf/products",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      // Remove old Cloudinary image
      if (product.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(product.cloudinaryPublicId);
      }

      product.image = uploadResult.secure_url;
      product.cloudinaryPublicId = uploadResult.public_id;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// Delete a product owned by the logged-in seller
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not the owner",
      });
    }

    // Delete image from Cloudinary
    if (product.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(product.cloudinaryPublicId);
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};
export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["available", "sold"].includes(status)) {
      return res.status(400).json({
        message: "Invalid product status",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not the owner",
      });
    }

    product.status = status;
    await product.save();

    res.status(200).json({
      message: "Product status updated",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product status",
    });
  }
};
