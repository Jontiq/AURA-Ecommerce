import express from "express";
import {
  getProducts,
  getProductById,
  getProductMeta,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/meta", getProductMeta);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
