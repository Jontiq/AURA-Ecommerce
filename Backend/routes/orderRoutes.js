import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Gäster kan lägga order, inloggade användare får den kopplad till sitt konto
// Vi hanterar det i controllern, så protect är valfri här
router.post("/", createOrder);

// Denna kräver inloggning man kan bara se sina egna ordrar
router.get("/myorders", protect, getMyOrders);

export default router;
