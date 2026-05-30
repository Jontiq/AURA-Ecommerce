import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  toggleFavorite
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe); // protect körs först, sen getMe
router.put("/favorites/:productId", protect, toggleFavorite);// protect körs först, sen toggleFavourite

export default router;
