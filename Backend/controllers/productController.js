import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

//@desc     Get all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//@desc     Get a single product by ID
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});


//@desc     Get all valid filter values/metadata for products
//@route    GET /api/products/meta
//@access   Public
const getProductMeta = asyncHandler(async (req, res) => {
  // Importerar konstanterna direkt från modellen
  const { VALID_NOTES, VALID_CATEGORIES } = await import("../models/Product.js");
  res.status(200).json({ notes: VALID_NOTES, categories: VALID_CATEGORIES });
});

export { getProducts, getProductById, getProductMeta };
