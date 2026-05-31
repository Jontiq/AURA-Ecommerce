import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

//@desc     Create a new order (Supports both logged-in users and guests)
//@route    POST /api/orders
//@access   Private/Guest
const createOrder = asyncHandler(async (req, res) => {
  const { delivery, items, paymentMethod, orderTotal } = req.body;

  // Grundläggande validering
  if (
    !delivery ||
    !items ||
    items.length === 0 ||
    !paymentMethod ||
    !orderTotal
  ) {
    res.status(400);
    throw new Error("Please provide all required order fields");
  }

  // Försöker läsa token om den finns, men kraschar inte om den saknas
  let userId = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      userId = decoded.user.id;
    } catch {
      // Ogiltig token – behandla som gäst
    }
  }

  // Om användaren är inloggad finns req.user (satt av protect),
  // annars är det ett gästköp och userId blir null
  const order = await Order.create({
    user: userId,
    delivery,
    items,
    paymentMethod,
    orderTotal,
  });

  res.status(201).json(order);
});

//@desc     Get logged-in user's orders
//@route    GET /api/orders/myorders
//@access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(orders);
});

export { createOrder, getMyOrders };
